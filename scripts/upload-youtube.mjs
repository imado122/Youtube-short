import { createReadStream, statSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIENT_ID     = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN;
const TITLE        = process.env.VIDEO_TITLE       || "🧳 حقائب النسمة — سافر بأسلوب | Al Nasme Premium Luggage";
const DESCRIPTION  = process.env.VIDEO_DESCRIPTION || `🧳 هل تبحث عن حقائب سفر فاخرة تدوم طويلاً؟

النسمة — الخيار الأول للمسافر العصري منذ عام ١٩٨٥

✅ وزن خفيف للغاية — تقنية الغلاف السيليكون
✅ متينة لا تُكسر — تتحمل كل الرحلات
✅ معتمدة دولياً — TSA approved
✅ قفل أمان مدمج — راحة بالك في كل مكان
✅ ٤٠ عاماً من الحرفية السورية الأصيلة

🌐 تسوق الآن: https://alnasme.shamsaver1.workers.dev/#process
📱 اطلب عبر واتساب مباشرة

---

Looking for luggage that actually lasts?

Al Nasme — premium luggage crafted in Damascus since 1985.
Built for travelers who refuse to compromise on quality.

🛒 Shop the collection: https://alnasme.shamsaver1.workers.dev/#process

#AlNasme #النسمة #LuggageCollection #حقائب_سفر #TravelInStyle
#PremiumLuggage #حقائب_فاخرة #سفر #Shorts #Travel #Damascus`;

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
      tags: ["AlNasme","النسمة","LuggageCollection","حقائب_سفر","TravelInStyle","PremiumLuggage","Shorts","Travel","Damascus","Syria"],
      categoryId: "26",
      defaultLanguage: "ar",
    },
    status: {
      privacyStatus: "public",
      selfDeclaredMadeForKids: false,
    },
  };

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

  const fileStream = createReadStream(VIDEO_PATH);
  const chunks = [];
  for await (const chunk of fileStream) chunks.push(chunk);
  const fileBuffer = Buffer.concat(chunks);

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4", "Content-Length": String(fileSize) },
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
    console.error("❌ Missing YouTube credentials.");
    process.exit(1);
  }
  const token = await getAccessToken();
  await uploadVideo(token);
}

main().catch((err) => { console.error(err); process.exit(1); });
