import type { Formula } from "~/type/brew";

export default defineEventHandler(async (event) => {
  const { token } = getRouterParams(event);
  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token parameter is required",
    });
  }

  const { force = "0" } = getQuery(event);
  const forceBoolean = !!parseInt(force as string);

  const storage = useStorage("data");

  // 抓取最新数据
  if (forceBoolean) {
    const cask = await getCaskByToken(token);
    await storage.setItem(`cask:${cask.token}`, cask);
    return cask;
  }

  // 返回缓存数据
  const cask = await storage.getItem<Formula>(`cask:${token}`);
  if (!cask) {
    throw createError({ statusCode: 404, statusMessage: "Cask not found" });
  }
  return cask;
});
