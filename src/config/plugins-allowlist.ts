import type { AvaClawConfig } from "./config.js";

export function ensurePluginAllowlisted(cfg: AvaClawConfig, pluginId: string): AvaClawConfig {
  const allow = cfg.plugins?.allow;
  if (!Array.isArray(allow) || allow.includes(pluginId)) {
    return cfg;
  }
  return {
    ...cfg,
    plugins: {
      ...cfg.plugins,
      allow: [...allow, pluginId],
    },
  };
}
