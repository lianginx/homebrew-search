import { createHash } from "node:crypto";

export default defineEventHandler(async (event) => {
  const { q } = await readBody(event);

  const storage = useStorage("data");

  const cacheKey = createHash("md5").update(q).digest("hex");

  const cached = await storage.getItem(`translate:${cacheKey}`);
  if (cached) {
    return cached;
  }

  const result = await translate(q, "auto", "zh");
  const dst = result.trans_result[0].dst;

  await storage.setItem(`translate:${cacheKey}`, dst);

  return dst;
});
