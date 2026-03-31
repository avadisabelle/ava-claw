import { describe, expect, it } from "vitest";
import { buildPlatformRuntimeLogHints, buildPlatformServiceStartHints } from "./runtime-hints.js";

describe("buildPlatformRuntimeLogHints", () => {
  it("renders launchd log hints on darwin", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "darwin",
        env: {
          AVACLAW_STATE_DIR: "/tmp/avaclaw-state",
          AVACLAW_LOG_PREFIX: "gateway",
        },
        systemdServiceName: "avaclaw-gateway",
        windowsTaskName: "AvaClaw Gateway",
      }),
    ).toEqual([
      "Launchd stdout (if installed): /tmp/avaclaw-state/logs/gateway.log",
      "Launchd stderr (if installed): /tmp/avaclaw-state/logs/gateway.err.log",
    ]);
  });

  it("renders systemd and windows hints by platform", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "linux",
        systemdServiceName: "avaclaw-gateway",
        windowsTaskName: "AvaClaw Gateway",
      }),
    ).toEqual(["Logs: journalctl --user -u avaclaw-gateway.service -n 200 --no-pager"]);
    expect(
      buildPlatformRuntimeLogHints({
        platform: "win32",
        systemdServiceName: "avaclaw-gateway",
        windowsTaskName: "AvaClaw Gateway",
      }),
    ).toEqual(['Logs: schtasks /Query /TN "AvaClaw Gateway" /V /FO LIST']);
  });
});

describe("buildPlatformServiceStartHints", () => {
  it("builds platform-specific service start hints", () => {
    expect(
      buildPlatformServiceStartHints({
        platform: "darwin",
        installCommand: "avaclaw gateway install",
        startCommand: "avaclaw gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.avaclaw.gateway.plist",
        systemdServiceName: "avaclaw-gateway",
        windowsTaskName: "AvaClaw Gateway",
      }),
    ).toEqual([
      "avaclaw gateway install",
      "avaclaw gateway",
      "launchctl bootstrap gui/$UID ~/Library/LaunchAgents/com.avaclaw.gateway.plist",
    ]);
    expect(
      buildPlatformServiceStartHints({
        platform: "linux",
        installCommand: "avaclaw gateway install",
        startCommand: "avaclaw gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.avaclaw.gateway.plist",
        systemdServiceName: "avaclaw-gateway",
        windowsTaskName: "AvaClaw Gateway",
      }),
    ).toEqual([
      "avaclaw gateway install",
      "avaclaw gateway",
      "systemctl --user start avaclaw-gateway.service",
    ]);
  });
});
