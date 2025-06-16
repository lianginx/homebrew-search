export default defineEventHandler(async () => {
  const storage = useStorage("data");

  const newData = await getCasks();
  for (const cask of newData) {
    await storage.setItem(`cask:${cask.token}`, cask);
  }

  return { success: true, message: "Cask pulled successfully" };
});
