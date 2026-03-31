import { beforeEach, describe, expect, it, vi } from "vitest";
import { createNonExitingRuntime } from "../runtime.js";

const resolveCleanupPlanFromDisk = vi.fn();
const removePath = vi.fn();
const listAgentSessionDirs = vi.fn();
const removeStateAndLinkedPaths = vi.fn();
const removeWorkspaceDirs = vi.fn();

vi.mock("../config/config.js", () => ({
  isNixMode: false,
}));

vi.mock("./cleanup-plan.js", () => ({
  resolveCleanupPlanFromDisk,
}));

vi.mock("./cleanup-utils.js", () => ({
  removePath,
  listAgentSessionDirs,
  removeStateAndLinkedPaths,
  removeWorkspaceDirs,
}));

const { resetCommand } = await import("./reset.js");

describe("resetCommand", () => {
  const runtime = createNonExitingRuntime();

  beforeEach(() => {
    vi.clearAllMocks();
    resolveCleanupPlanFromDisk.mockReturnValue({
      stateDir: "/tmp/.avaclaw",
      configPath: "/tmp/.avadisabelle/ava-claw.json",
      oauthDir: "/tmp/.avaclaw/credentials",
      configInsideState: true,
      oauthInsideState: true,
      workspaceDirs: ["/tmp/.avaclaw/workspace"],
    });
    removePath.mockResolvedValue({ ok: true });
    listAgentSessionDirs.mockResolvedValue(["/tmp/.avaclaw/agents/main/sessions"]);
    removeStateAndLinkedPaths.mockResolvedValue(undefined);
    removeWorkspaceDirs.mockResolvedValue(undefined);
    vi.spyOn(runtime, "log").mockImplementation(() => {});
    vi.spyOn(runtime, "error").mockImplementation(() => {});
  });

  it("recommends creating a backup before state-destructive reset scopes", async () => {
    await resetCommand(runtime, {
      scope: "config+creds+sessions",
      yes: true,
      nonInteractive: true,
      dryRun: true,
    });

    expect(runtime.log).toHaveBeenCalledWith(expect.stringContaining("avaclaw backup create"));
  });

  it("does not recommend backup for config-only reset", async () => {
    await resetCommand(runtime, {
      scope: "config",
      yes: true,
      nonInteractive: true,
      dryRun: true,
    });

    expect(runtime.log).not.toHaveBeenCalledWith(expect.stringContaining("avaclaw backup create"));
  });
});
