import type { Cask, Formula } from "~/type/brew";

export async function getFormulas() {
  return await $fetch<Formula[]>("https://formulae.brew.sh/api/formula.json");
}

export async function getFormulaByName(name: string) {
  if (!name) {
    throw new Error("Name parameter is required");
  }
  return await $fetch<Formula>(
    `https://formulae.brew.sh/api/formula/${name}.json`
  );
}

export async function getCasks() {
  return await $fetch<Cask[]>("https://formulae.brew.sh/api/cask.json");
}

export async function getCaskByToken(token: string) {
  if (!token) {
    throw new Error("Token parameter is required");
  }
  return await $fetch<Cask>(`https://formulae.brew.sh/api/cask/${token}.json`);
}
