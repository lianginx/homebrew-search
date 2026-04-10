const { public: { homebrewApi } } = useRuntimeConfig()

export async function getFormulas() {
  return await $fetch<Formula[]>(`${homebrewApi}/formula.json`);
}

export async function getFormulaByName(name: string) {
  if (!name) {
    throw new Error("Name parameter is required");
  }
  return await $fetch<Formula>(`${homebrewApi}/formula/${name}.json`);
}

export async function getCasks() {
  return await $fetch<Cask[]>(`${homebrewApi}/cask.json`);
}

export async function getCaskByToken(token: string) {
  if (!token) {
    throw new Error("Token parameter is required");
  }
  return await $fetch<Cask>(`${homebrewApi}/cask/${token}.json`);
}
