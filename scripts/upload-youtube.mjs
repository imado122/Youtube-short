import { createReadStream, statSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_ID     = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN;

const TITLE = "🎓 أصعب سؤال في البكالوريا ٢٠٢٥... 😂 | حقائب النسمة | Al Nasme #Shorts #بكالوريا";

const DESCRIPTION = `أصعب سؤال في بكالوريا ٢٠٢٥: أي حقيبة تشتري بعد الامتحان؟ 😂🎓

مبروك لكل الناجحين! وقت السفر والاحتفال جاء 🧳✈️

📞 اتصل أو واتساب: +963 983 541 883
🌐 الموقع: https://alnasme.shamsaver1.workers.dev/#process
🌍 شحن لكل أرجاء العالم

حقائب النسمة — هدية التخرج المثالية لكل ناجح
جودة سورية أصيلة منذ ١٩٨٥ 🏆

---

Hardest Bac 2025 question: which bag for your post-exam trip? 😂🎓

Congratulations to all graduates! Travel time has arrived 🧳✈️

📞 Call/WhatsApp: +963 983 541 883
🌐 Website: https://alnasme.shamsaver1.workers.dev/#process
🚚 Worldwide Shipping Available

Al Nasme Luggage — The perfect graduation gift
Premium Syrian craftsmanship since 1985

#بكالوريا_2025 #بكالوريا #AlNasme #النسمة #حقائب_سفر #هدية_التخرج #GraduationGift #Shorts #Syria #سوريا #سفر #Baccalaureate`;

const VIDEO_PATH = resolve(__dirname, "../output/youtube-short.mp4");

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, refresh_token: REFRESH_TOKEN, grant_type: "refresh_token" }),
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
      tags: ["بكالوريا_2025","بكالوريا","AlNasme","النسمة","حقائب_سفر","هدية_التخرج","GraduationGift","Shorts","Syria","سوريا","سفر","Baccalaureate","graduation","funny","viral"],
      categoryId: "26",
      defaultLanguage: "ar",
    },
    status: { privacyStatus: "public", selfDeclaredMadeForKids: false },
  };
  const initRes = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    { method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", "X-Upload-Content-Type": "video/mp4", "X-Upload-Content-Length": String(fileSize) }, body: JSON.stringify(metadata) }
  );
  if (!initRes.ok) { const err = await initRes.text(); throw new Error(`Init failed: ${initRes.status} ${err}`); }
  const uploadUrl = initRes.headers.get("location");
  console.log("📡 Uploading…");
  const chunks = []; for await (const chunk of createReadStream(VIDEO_PATH)) chunks.push(chunk);
  const uploadRes = await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": "video/mp4", "Content-Length": String(fileSize) }, body: Buffer.concat(chunks) });
  if (!uploadRes.ok) { const err = await uploadRes.text(); throw new Error(`Upload failed: ${uploadRes.status} ${err}`); }
  const result = await uploadRes.json();
  console.log(`✅ Published! https://www.youtube.com/shorts/${result.id}`);
  return result;
}

async function main() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) { console.error("❌ Missing credentials"); process.exit(1); }
  const token = await getAccessToken();
  await uploadVideo(token);
}
main().catch(err => { console.error(err); process.exit(1); });
