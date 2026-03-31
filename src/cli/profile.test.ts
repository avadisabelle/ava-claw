import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "avaclaw",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "avaclaw", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "avaclaw", "--dev", "gateway"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "avaclaw", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "avaclaw", "--profile", "work", "status"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "avaclaw", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "avaclaw", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it.each([
    ["--dev first", ["node", "avaclaw", "--dev", "--profile", "work", "status"]],
    ["--profile first", ["node", "avaclaw", "--profile", "work", "--dev", "status"]],
  ])("rejects combining --dev with --profile (%s)", (_name, argv) => {
    const res = parseCliProfileArgs(argv);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join(path.resolve("/home/peter"), ".avaclaw-dev");
    expect(env.AVACLAW_PROFILE).toBe("dev");
    expect(env.AVACLAW_STATE_DIR).toBe(expectedStateDir);
    expect(env.AVACLAW_CONFIG_PATH).toBe(path.join(expectedStateDir, "avaclaw.json"));
    expect(env.AVACLAW_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      AVACLAW_STATE_DIR: "/custom",
      AVACLAW_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.AVACLAW_STATE_DIR).toBe("/custom");
    expect(env.AVACLAW_GATEWAY_PORT).toBe("19099");
    expect(env.AVACLAW_CONFIG_PATH).toBe(path.join("/custom", "avaclaw.json"));
  });

  it("uses AVACLAW_HOME when deriving profile state dir", () => {
    const env: Record<string, string | undefined> = {
      AVACLAW_HOME: "/srv/avaclaw-home",
      HOME: "/home/other",
    };
    applyCliProfileEnv({
      profile: "work",
      env,
      homedir: () => "/home/fallback",
    });

    const resolvedHome = path.resolve("/srv/avaclaw-home");
    expect(env.AVACLAW_STATE_DIR).toBe(path.join(resolvedHome, ".avaclaw-work"));
    expect(env.AVACLAW_CONFIG_PATH).toBe(path.join(resolvedHome, ".avaclaw-work", "avaclaw.json"));
  });
});

describe("formatCliCommand", () => {
  it.each([
    {
      name: "no profile is set",
      cmd: "avaclaw doctor --fix",
      env: {},
      expected: "avaclaw doctor --fix",
    },
    {
      name: "profile is default",
      cmd: "avaclaw doctor --fix",
      env: { AVACLAW_PROFILE: "default" },
      expected: "avaclaw doctor --fix",
    },
    {
      name: "profile is Default (case-insensitive)",
      cmd: "avaclaw doctor --fix",
      env: { AVACLAW_PROFILE: "Default" },
      expected: "avaclaw doctor --fix",
    },
    {
      name: "profile is invalid",
      cmd: "avaclaw doctor --fix",
      env: { AVACLAW_PROFILE: "bad profile" },
      expected: "avaclaw doctor --fix",
    },
    {
      name: "--profile is already present",
      cmd: "avaclaw --profile work doctor --fix",
      env: { AVACLAW_PROFILE: "work" },
      expected: "avaclaw --profile work doctor --fix",
    },
    {
      name: "--dev is already present",
      cmd: "avaclaw --dev doctor",
      env: { AVACLAW_PROFILE: "dev" },
      expected: "avaclaw --dev doctor",
    },
  ])("returns command unchanged when $name", ({ cmd, env, expected }) => {
    expect(formatCliCommand(cmd, env)).toBe(expected);
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("avaclaw doctor --fix", { AVACLAW_PROFILE: "work" })).toBe(
      "avaclaw --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("avaclaw doctor --fix", { AVACLAW_PROFILE: "  jbavaclaw  " })).toBe(
      "avaclaw --profile jbavaclaw doctor --fix",
    );
  });

  it("handles command with no args after avaclaw", () => {
    expect(formatCliCommand("avaclaw", { AVACLAW_PROFILE: "test" })).toBe("avaclaw --profile test");
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm avaclaw doctor", { AVACLAW_PROFILE: "work" })).toBe(
      "pnpm avaclaw --profile work doctor",
    );
  });
});
