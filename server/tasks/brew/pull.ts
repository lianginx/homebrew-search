export default defineTask({
  meta: {
    name: "brew:pull",
    description: "抓取 Homebrew 最新的 Formula 和 Cask 保存到本地缓存",
  },
  async run() {
    await Promise.all([pullCasks(), pullFormulas()]);
    return { result: "成功" };
  },
});

const storage = useStorage("data");

async function pullCasks() {
  const casks = await getCasks();
  for (const cask of casks) {
    await storage.setItem(`cask:${cask.token}`, cask);
  }
}

async function pullFormulas() {
  const formulas = await getFormulas();
  for (const formula of formulas) {
    await storage.setItem(`formula:${formula.name}`, formula);
  }
}
