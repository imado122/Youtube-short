import { chromium } from "playwright";
import { mkdir, readdir, rename } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIDEO_DURATION_MS = 47000; // 45s video + 2s buffer
const BASE_URL = process.env.BASE_URL || "http://localhost:4173/";

async function main() {
  console.log(`Recording ${VIDEO_DURATION_MS / 1000}s from ${BASE_URL}`);
  await mkdir("output", { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: "output/",
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  page.on("console", (msg) => console.log("[browser]", msg.text()));
  page.on("pageerror", (err) => console.error("[page error]", err.message));

  console.log("Navigating to app...");
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  console.log(`Waiting ${VIDEO_DURATION_MS / 1000}s for animation to play...`);
  await page.waitForTimeout(VIDEO_DURATION_MS);

  const videoPath = await page.video()?.path();
  await context.close();
  await browser.close();

  if (videoPath) {
    const dest = path.join("output", "youtube-short.webm");
    await rename(videoPath, dest);
    console.log(`Video saved: ${dest}`);
  } else {
    const files = await readdir("output/");
    const webm = files.find((f) => f.endsWith(".webm"));
    if (webm) {
      await rename(path.join("output", webm), path.join("output", "youtube-short.webm"));
      console.log("Video saved: output/youtube-short.webm");
    } else {
      console.error("No video file found in output/");
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
