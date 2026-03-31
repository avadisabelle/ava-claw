export const AVACLAW_CLI_ENV_VAR = "AVACLAW_CLI";
export const AVACLAW_CLI_ENV_VALUE = "1";

export function markAvaClawExecEnv<T extends Record<string, string | undefined>>(env: T): T {
  return {
    ...env,
    [AVACLAW_CLI_ENV_VAR]: AVACLAW_CLI_ENV_VALUE,
  };
}

export function ensureAvaClawExecMarkerOnProcess(
  env: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv {
  env[AVACLAW_CLI_ENV_VAR] = AVACLAW_CLI_ENV_VALUE;
  return env;
}
