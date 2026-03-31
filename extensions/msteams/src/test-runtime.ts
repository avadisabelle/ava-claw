import os from "node:os";
import path from "node:path";
import type { PluginRuntime } from "avaclaw/plugin-sdk/msteams";

export const msteamsRuntimeStub = {
  state: {
    resolveStateDir: (env: NodeJS.ProcessEnv = process.env, homedir?: () => string) => {
      const override = env.AVACLAW_STATE_DIR?.trim() || env.AVACLAW_STATE_DIR?.trim();
      if (override) {
        return override;
      }
      const resolvedHome = homedir ? homedir() : os.homedir();
      return path.join(resolvedHome, ".avaclaw");
    },
  },
} as unknown as PluginRuntime;
