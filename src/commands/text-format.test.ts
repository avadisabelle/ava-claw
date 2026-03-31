import { describe, expect, it } from "vitest";
import { shortenText } from "./text-format.js";

describe("shortenText", () => {
  it("returns original text when it fits", () => {
    expect(shortenText("avaclaw", 16)).toBe("avaclaw");
  });

  it("truncates and appends ellipsis when over limit", () => {
    expect(shortenText("avaclaw-status-output", 10)).toBe("avaclaw-…");
  });

  it("counts multi-byte characters correctly", () => {
    expect(shortenText("hello🙂world", 7)).toBe("hello🙂…");
  });
});
