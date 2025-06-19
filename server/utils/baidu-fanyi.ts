import { createHash } from "node:crypto";

export interface BaiduFanyiResult {
  from: string;
  to: string;
  trans_result: Array<{
    src: string;
    dst: string;
  }>;
  error_code?: string;
  error_msg?: string;
}

const { baiduAppId, baiduSecretKey } = useRuntimeConfig();

/**
 * 调用百度翻译接口
 * @param q 原文内容
 * @param from 源语言（如 'auto'）
 * @param to 目标语言（如 'zh'）
 * @returns 翻译结果对象
 */
export async function translate(
  q: string,
  from: string = "auto",
  to: string
): Promise<BaiduFanyiResult> {
  const url = "https://fanyi-api.baidu.com/api/trans/vip/translate";

  const { salt, sign } = generateSign(q);
  const form = new URLSearchParams();
  form.set("q", q);
  form.set("from", from);
  form.set("to", to);
  form.set("appid", String(baiduAppId));
  form.set("salt", salt);
  form.set("sign", sign);

  const result = await $fetch<BaiduFanyiResult>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });

  if (result.error_code) {
    throw new Error(result.error_msg || "Baidu Translate Error");
  }

  return result;
}

/**
 * 生成百度翻译签名
 * @param q 原文内容
 * @returns 包含 salt 和 sign 的对象
 */
function generateSign(q: string): { salt: string; sign: string } {
  const salt = Date.now().toString();
  const signStr = `${baiduAppId}${q}${salt}${baiduSecretKey}`;
  const sign = createHash("md5").update(signStr).digest("hex");
  return { salt, sign };
}
