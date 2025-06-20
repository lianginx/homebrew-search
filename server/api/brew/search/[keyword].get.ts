import Fuse from "fuse.js";
import type { H3Event, EventHandlerRequest } from "h3";

export default defineEventHandler(async (event) => {
  const { keyword, type, page, limit } = handleParams(event);

  const storage = useStorage("data");

  // 查询缓存 key
  const keys = [];
  if (type === "cask" || !type) {
    const nextKeys = await storage.getKeys("cask:");
    keys.push(...nextKeys);
  }
  if (type === "formula" || !type) {
    const nextKeys = await storage.getKeys("formula:");
    keys.push(...nextKeys);
  }

  // 模糊搜索
  const fuse = new Fuse(keys);
  const searchedKeys = fuse.search(keyword).map((result) => result.item);

  // 总数
  const total = searchedKeys.length;

  // 分页
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedKeys = searchedKeys.slice(startIndex, endIndex);

  // 查询缓存
  const list = await Promise.all(
    paginatedKeys.map((key) => storage.getItem(key))
  );

  return { list, total, page, limit };
});

function handleParams(event: H3Event<EventHandlerRequest>) {
  const { keyword } = getRouterParams(event);
  if (!keyword) {
    throw createError({
      statusCode: 400,
      statusMessage: "keyword parameter is required",
    });
  }

  const { type = "" } = getQuery(event);
  if (type && type !== "cask" && type !== "formula") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid type parameter, must be 'cask' or 'formula'",
    });
  }

  const { page = 1, limit = 15 } = getQuery(event);
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  if (isNaN(pageNumber) || isNaN(limitNumber)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid pagination parameters",
    });
  }

  return {
    keyword,
    type,
    page: pageNumber,
    limit: limitNumber,
  };
}
