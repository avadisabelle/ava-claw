// Narrow plugin-sdk surface for the bundled diffs plugin.
// Keep this list additive and scoped to symbols used under extensions/diffs.

export type { AvaClawConfig } from "../config/config.js";
export { resolvePreferredAvaClawTmpDir } from "../infra/tmp-avaclaw-dir.js";
export type {
  AnyAgentTool,
  AvaClawPluginApi,
  AvaClawPluginConfigSchema,
  PluginLogger,
} from "../plugins/types.js";
