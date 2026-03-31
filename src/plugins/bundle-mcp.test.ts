import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { AvaClawConfig } from "../config/config.js";
import { captureEnv } from "../test-utils/env.js";
import { loadEnabledBundleMcpConfig } from "./bundle-mcp.js";
import { clearPluginManifestRegistryCache } from "./manifest-registry.js";

const tempDirs: string[] = [];

async function createTempDir(prefix: string): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  clearPluginManifestRegistryCache();
  await Promise.all(
    tempDirs.splice(0, tempDirs.length).map((dir) => fs.rm(dir, { recursive: true, force: true })),
  );
});

describe("loadEnabledBundleMcpConfig", () => {
  it("loads enabled Claude bundle MCP config and absolutizes relative args", async () => {
    const env = captureEnv(["HOME"]);
    try {
      const homeDir = await createTempDir("avaclaw-bundle-mcp-home-");
      const workspaceDir = await createTempDir("avaclaw-bundle-mcp-workspace-");
      process.env.HOME = homeDir;

      const pluginRoot = path.join(homeDir, ".avaclaw", "extensions", "bundle-probe");
      const serverPath = path.join(pluginRoot, "servers", "probe.mjs");
      await fs.mkdir(path.join(pluginRoot, ".claude-plugin"), { recursive: true });
      await fs.mkdir(path.dirname(serverPath), { recursive: true });
      await fs.writeFile(serverPath, "export {};\n", "utf-8");
      await fs.writeFile(
        path.join(pluginRoot, ".claude-plugin", "plugin.json"),
        `${JSON.stringify({ name: "bundle-probe" }, null, 2)}\n`,
        "utf-8",
      );
      await fs.writeFile(
        path.join(pluginRoot, ".mcp.json"),
        `${JSON.stringify(
          {
            mcpServers: {
              bundleProbe: {
                command: "node",
                args: ["./servers/probe.mjs"],
              },
            },
          },
          null,
          2,
        )}\n`,
        "utf-8",
      );

      const config: AvaClawConfig = {
        plugins: {
          entries: {
            "bundle-probe": { enabled: true },
          },
        },
      };

      const loaded = loadEnabledBundleMcpConfig({
        workspaceDir,
        cfg: config,
      });
      const resolvedServerPath = await fs.realpath(serverPath);

      expect(loaded.diagnostics).toEqual([]);
      expect(loaded.config.mcpServers.bundleProbe?.command).toBe("node");
      expect(loaded.config.mcpServers.bundleProbe?.args).toEqual([resolvedServerPath]);
    } finally {
      env.restore();
    }
  });

  it("merges inline bundle MCP servers and skips disabled bundles", async () => {
    const env = captureEnv(["HOME"]);
    try {
      const homeDir = await createTempDir("avaclaw-bundle-inline-home-");
      const workspaceDir = await createTempDir("avaclaw-bundle-inline-workspace-");
      process.env.HOME = homeDir;

      const enabledRoot = path.join(homeDir, ".avaclaw", "extensions", "inline-enabled");
      const disabledRoot = path.join(homeDir, ".avaclaw", "extensions", "inline-disabled");
      await fs.mkdir(path.join(enabledRoot, ".claude-plugin"), { recursive: true });
      await fs.mkdir(path.join(disabledRoot, ".claude-plugin"), { recursive: true });
      await fs.writeFile(
        path.join(enabledRoot, ".claude-plugin", "plugin.json"),
        `${JSON.stringify(
          {
            name: "inline-enabled",
            mcpServers: {
              enabledProbe: {
                command: "node",
                args: ["./enabled.mjs"],
              },
            },
          },
          null,
          2,
        )}\n`,
        "utf-8",
      );
      await fs.writeFile(
        path.join(disabledRoot, ".claude-plugin", "plugin.json"),
        `${JSON.stringify(
          {
            name: "inline-disabled",
            mcpServers: {
              disabledProbe: {
                command: "node",
                args: ["./disabled.mjs"],
              },
            },
          },
          null,
          2,
        )}\n`,
        "utf-8",
      );

      const config: AvaClawConfig = {
        plugins: {
          entries: {
            "inline-enabled": { enabled: true },
            "inline-disabled": { enabled: false },
          },
        },
      };

      const loaded = loadEnabledBundleMcpConfig({
        workspaceDir,
        cfg: config,
      });

      expect(loaded.config.mcpServers.enabledProbe).toBeDefined();
      expect(loaded.config.mcpServers.disabledProbe).toBeUndefined();
    } finally {
      env.restore();
    }
  });
});
