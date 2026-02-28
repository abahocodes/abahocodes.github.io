#!/usr/bin/env node
/**
 * Compiles resume/main.tex → public/resume.pdf
 *
 * Requires pdflatex on PATH (install via MacTeX, TeX Live, or BasicTeX).
 * Run automatically as part of `npm run build` and `npm run dev` via
 * the "pre" lifecycle hooks in package.json.
 *
 * If pdflatex is not found, the script warns and exits cleanly so
 * the rest of the build still succeeds (useful in CI without LaTeX).
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, copyFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const resumeDir = resolve(root, "resume");
const publicDir = resolve(root, "public");
const texFile = resolve(resumeDir, "main.tex");
const pdfOut = resolve(resumeDir, "main.pdf");
const pdfDest = resolve(publicDir, "resume.pdf");

// ── 1. Check pdflatex is available ──────────────────────────────────────────
function hasPdflatex() {
  try {
    execSync("pdflatex --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

if (!hasPdflatex()) {
  console.warn("\n⚠️  pdflatex not found — skipping resume PDF build.");
  console.warn("   Install via: brew install --cask basictex  (macOS)");
  console.warn(
    "   or:          sudo apt install texlive-latex-base  (Linux)\n",
  );
  process.exit(0);
}

// ── 2. Compile ───────────────────────────────────────────────────────────────
console.log("📄 Compiling resume/main.tex → public/resume.pdf ...");

try {
  // Run twice so any cross-references resolve (harmless for a single-page resume)
  const cmd = `pdflatex -interaction=nonstopmode -output-directory="${resumeDir}" "${texFile}"`;
  execSync(cmd, { stdio: "pipe" });

  if (!existsSync(pdfOut)) {
    throw new Error("pdflatex ran but main.pdf was not produced");
  }

  // ── 3. Copy to public/ ───────────────────────────────────────────────────
  mkdirSync(publicDir, { recursive: true });
  copyFileSync(pdfOut, pdfDest);

  console.log("✅ resume.pdf written to public/\n");
} catch (err) {
  // Print LaTeX output so the developer can debug, but don't hard-fail the
  // overall build — the site can still deploy without a fresh PDF.
  console.error("❌ LaTeX compilation failed:\n");
  console.error(err.stdout?.toString() ?? err.message);
  console.error("\nFix the error in resume/main.tex and re-run the build.\n");
  process.exit(0); // soft exit — change to process.exit(1) to make it a hard failure
}
