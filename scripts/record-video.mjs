import { chromium } from "playwright";
import { mkdir, readdir, rename } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIDEO_DURATION_MS = 42000; // 40s video + 2s buffer
const BASE_URL = process.env.BASE_URL || "http://localhost:4173/";

async function main() {
  console.log(`Recording ${VIDEO_DURATION_MS / 1000}s portrait Short from ${BASE_URL}`);
  await mkdir("output", { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // 9:16 vertical — true YouTube Shorts format
  const context = await browser.newContext({
    viewport: { width: 720, height: 1280 },
    recordVideo: {
      dir: "output/",
      size: { width: 720, height: 1280 },
    },
  });

  const page = await context.newPage();
  page.on("console", (msg) => console.log("[browser]", msg.text()));
  page.on("pageerror", (err) => console.error("[page error]", err.message));

  console.log("Navigating to app...");
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  // Wait for React to mount and first scene to render before starting timer
  await page.waitForFunction(
    () => document.querySelector("[data-scene]") !== null,
    { timeout: 15000 }
  ).catch(() => console.log("data-scene selector timeout — proceeding anyway"));

  // Small settle buffer so frame 0 is not black
  await page.waitForTimeout(200);

  console.log(`Recording ${VIDEO_DURATION_MS / 1000}s…`);
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

main().catch((err) => { console.error(err); process.exit(1); });
