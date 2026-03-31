import { beforeEach, describe, expect, it, vi } from "vitest";
import { resolvePluginProviders } from "./providers.js";

const loadAvaClawPluginsMock = vi.fn();

vi.mock("./loader.js", () => ({
  loadAvaClawPlugins: (...args: unknown[]) => loadAvaClawPluginsMock(...args),
}));

describe("resolvePluginProviders", () => {
  beforeEach(() => {
    loadAvaClawPluginsMock.mockReset();
    loadAvaClawPluginsMock.mockReturnValue({
      providers: [{ provider: { id: "demo-provider" } }],
    });
  });

  it("forwards an explicit env to plugin loading", () => {
    const env = { AVACLAW_HOME: "/srv/avaclaw-home" } as NodeJS.ProcessEnv;

    const providers = resolvePluginProviders({
      workspaceDir: "/workspace/explicit",
      env,
    });

    expect(providers).toEqual([{ id: "demo-provider" }]);
    expect(loadAvaClawPluginsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        workspaceDir: "/workspace/explicit",
        env,
      }),
    );
  });

  it("can augment restrictive allowlists for bundled provider compatibility", () => {
    resolvePluginProviders({
      config: {
        plugins: {
          allow: ["openrouter"],
        },
      },
      bundledProviderAllowlistCompat: true,
    });

    expect(loadAvaClawPluginsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          plugins: expect.objectContaining({
            allow: expect.arrayContaining(["openrouter", "kilocode", "moonshot"]),
          }),
        }),
      }),
    );
  });
});
