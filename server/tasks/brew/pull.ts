/* eslint-disable no-console */

export default defineTask({
  meta: {
    name: 'brew:pull',
    description: '抓取 Homebrew 最新的 Formula 和 Cask 保存到本地缓存',
  },
  async run() {
    console.log(`[${new Date().toLocaleString()}] [Task] [brew:pull] 抓取 Homebrew 最新的 Formula 和 Cask 保存到本地缓存`)
    await Promise.all([pullCasks(), pullFormulas()])
    console.log(`[${new Date().toLocaleString()}] [Task] [brew:pull] 任务完成`)
    return { result: '成功' }
  },
})

const storage = useStorage()

async function pullCasks() {
  console.log(`[${new Date().toLocaleString()}] [Task] [brew:pull] 开始抓取 Cask`)
  const casks = await getCasks()
  for (const cask of casks) {
    await storage.setItem(`cask:${cask.token}`, cask)
  }
  console.log(`[${new Date().toLocaleString()}] [Task] [brew:pull] 已抓取 ${casks.length} 个 Cask`)
}

async function pullFormulas() {
  console.log(`[${new Date().toLocaleString()}] [Task] [brew:pull] 开始抓取 Formula`)
  const formulas = await getFormulas()
  for (const formula of formulas) {
    await storage.setItem(`formula:${formula.name}`, formula)
  }
  console.log(`[${new Date().toLocaleString()}] [Task] [brew:pull] 已抓取 ${formulas.length} 个 Formula`)
}
