import { readFileSync } from "fs";
import { join } from "path";

/**
 * Loads a CSS file and returns its contents as a string
 * @param filename - The name of the CSS file (without extension)
 * @returns The CSS content as a string
 */
export function loadCSS(filename: string): string {
  const cssPath = join(process.cwd(), "src", "styles", `${filename}.css`);
  return readFileSync(cssPath, "utf-8");
}
