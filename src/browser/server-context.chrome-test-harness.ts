import { vi } from "vitest";
import { installChromeUserDataDirHooks } from "./chrome-user-data-dir.test-harness.js";

const chromeUserDataDir = { dir: "/tmp/avaclaw" };
installChromeUserDataDirHooks(chromeUserDataDir);

vi.mock("./chrome.js", () => ({
  isChromeCdpReady: vi.fn(async () => true),
  isChromeReachable: vi.fn(async () => true),
  launchAvaClawChrome: vi.fn(async () => {
    throw new Error("unexpected launch");
  }),
  resolveAvaClawUserDataDir: vi.fn(() => chromeUserDataDir.dir),
  stopAvaClawChrome: vi.fn(async () => {}),
}));
