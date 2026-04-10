/* eslint-disable no-console */

export default defineEventHandler(async (event) => {
  const datetime = new Date().toLocaleString()
  console.log(`[${datetime}] [${event.method}] ${event.path}`)
})
