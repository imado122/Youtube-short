import { createReadStream, statSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIENT_ID     = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN;
const TITLE        = process.env.VIDEO_TITLE       || "Al Nasme — The Art of Travel | النسمة للحقائب الفاخرة";
const DESCRIPTION  = process.env.VIDEO_DESCRIPTION || `✈️ Discover Al Nasme's premium luggage collection — crafted for those who travel in style.

🧳 Timeless designs. Unmatched quality. Built for every journey.

🛒 Shop now: [your link here]

#AlNasme #LuggageCollection #TravelInStyle #النسمة #حقائب_سفر #حقائب_فاخرة #Shorts`;

const VIDEO_PATH = resolve(__dirname, "../output/youtube-short.mp4");

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to get access token: " + JSON.stringify(data));
  console.log("✅ Got access token");
  return data.access_token;
}

async function uploadVideo(accessToken) {
  const fileSize = statSync(VIDEO_PATH).size;
  console.log(`📦 Video size: ${(fileSize / 1024 / 1024).toFixed(1)} MB`);

  const metadata = {
    snippet: {
      title: TITLE,
      description: DESCRIPTION,
      tags: ["AlNasme", "Luggage", "Travel", "النسمة", "حقائب_سفر", "Shorts"],
      categoryId: "26", // Howto & Style
      defaultLanguage: "ar",
    },
    status: {
      privacyStatus: "public",
      selfDeclaredMadeForKids: false,
    },
  };

  // Step 1: Initiate resumable upload session
  const initRes = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Upload-Content-Type": "video/mp4",
        "X-Upload-Content-Length": String(fileSize),
      },
      body: JSON.stringify(metadata),
    }
  );

  if (!initRes.ok) {
    const err = await initRes.text();
    throw new Error(`Failed to init upload: ${initRes.status} ${err}`);
  }

  const uploadUrl = initRes.headers.get("location");
  console.log("📡 Upload session started");

  // Step 2: Upload file in one chunk (resumable protocol)
  const fileStream = createReadStream(VIDEO_PATH);
  const chunks = [];
  for await (const chunk of fileStream) chunks.push(chunk);
  const fileBuffer = Buffer.concat(chunks);

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(fileSize),
    },
    body: fileBuffer,
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    throw new Error(`Upload failed: ${uploadRes.status} ${err}`);
  }

  const result = await uploadRes.json();
  console.log(`✅ Published! Video ID: ${result.id}`);
  console.log(`🔗 https://www.youtube.com/shorts/${result.id}`);
  return result;
}

async function main() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error("❌ Missing YouTube credentials. Set YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN in GitHub Secrets.");
    process.exit(1);
  }
  const token = await getAccessToken();
  await uploadVideo(token);
}

main().catch((err) => { console.error(err); process.exit(1); });
