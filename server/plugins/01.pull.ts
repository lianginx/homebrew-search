export default defineNitroPlugin(async () => {
  // 服务首次启动时抓取最新数据
  await runTask("brew:pull");
});
