import { describe, expect, it } from "vitest";
import {
  ensureAvaClawExecMarkerOnProcess,
  markAvaClawExecEnv,
  AVACLAW_CLI_ENV_VALUE,
  AVACLAW_CLI_ENV_VAR,
} from "./avaclaw-exec-env.js";

describe("markAvaClawExecEnv", () => {
  it("returns a cloned env object with the exec marker set", () => {
    const env = { PATH: "/usr/bin", AVACLAW_CLI: "0" };
    const marked = markAvaClawExecEnv(env);

    expect(marked).toEqual({
      PATH: "/usr/bin",
      AVACLAW_CLI: AVACLAW_CLI_ENV_VALUE,
    });
    expect(marked).not.toBe(env);
    expect(env.AVACLAW_CLI).toBe("0");
  });
});

describe("ensureAvaClawExecMarkerOnProcess", () => {
  it("mutates and returns the provided process env", () => {
    const env: NodeJS.ProcessEnv = { PATH: "/usr/bin" };

    expect(ensureAvaClawExecMarkerOnProcess(env)).toBe(env);
    expect(env[AVACLAW_CLI_ENV_VAR]).toBe(AVACLAW_CLI_ENV_VALUE);
  });

  it("defaults to mutating process.env when no env object is provided", () => {
    const previous = process.env[AVACLAW_CLI_ENV_VAR];
    delete process.env[AVACLAW_CLI_ENV_VAR];

    try {
      expect(ensureAvaClawExecMarkerOnProcess()).toBe(process.env);
      expect(process.env[AVACLAW_CLI_ENV_VAR]).toBe(AVACLAW_CLI_ENV_VALUE);
    } finally {
      if (previous === undefined) {
        delete process.env[AVACLAW_CLI_ENV_VAR];
      } else {
        process.env[AVACLAW_CLI_ENV_VAR] = previous;
      }
    }
  });
});
