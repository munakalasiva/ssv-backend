import axios from "axios";

export async function purgePrerender(url) {
  try {
    await axios.delete(
      `https://api.prerender.io/recache?prerenderToken=${process.env.PRERENDER_TOKEN}&url=${url}`
    );
    console.log("🔄 Cache purged for:", url);
  } catch (error) {
    console.error("❌ Prerender purge failed:", error.message);
  }
}
