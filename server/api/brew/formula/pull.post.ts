export default defineEventHandler(async () => {
  const storage = useStorage("assets:server");

  const newData = await getFormulas();
  for (const formula of newData) {
    await storage.setItem(`formula:${formula.name}`, formula);
  }

  return { success: true, message: "Formula pulled successfully" };
});
