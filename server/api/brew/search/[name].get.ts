import Fuse from "fuse.js";

export default defineEventHandler(async () => {
  const { name, type, page, limit } = handleParams();

  // 查询缓存 key
  const storage = useStorage("data");
  const keys = await storage.getKeys(`${type}:`);

  // 模糊搜索
  const fuse = new Fuse(keys);
  const searchedKeys = fuse.search(name).map((result) => result.item);

  // 分页
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedKeys = searchedKeys.slice(startIndex, endIndex);

  // 查询缓存
  const formulas = await Promise.all(
    paginatedKeys.map((key) => storage.getItem(key))
  );

  return formulas;
});

function handleParams() {
  const event = useEvent();

  const { name } = getRouterParams(event);
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name parameter is required",
    });
  }

  const { type = "" } = getQuery(event);
  if (type !== "cask" && type !== "formula") {
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
    name,
    type,
    page: pageNumber,
    limit: limitNumber,
  };
}
