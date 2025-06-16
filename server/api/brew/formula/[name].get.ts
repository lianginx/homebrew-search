import type { Formula } from "~/type/brew";

export default defineEventHandler(async (event) => {
  const { name } = getRouterParams(event);
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name parameter is required",
    });
  }

  const { force = 1 } = getQuery(event);
  const forceBoolean = Boolean(force);

  const storage = useStorage("assets:server");

  // 抓取最新数据
  if (forceBoolean) {
    const formula = await getFormulaByName(name);
    await storage.setItem(`formula:${formula.name}`, formula);
    return formula;
  }

  // 返回缓存数据
  const formula = await storage.getItem<Formula>(`formula:${name}`);
  if (!formula) {
    throw createError({ statusCode: 404, statusMessage: "Formula not found" });
  }
  return formula;
});
