import { scenes } from "../data/scenes.js";

export function normalizeBrowserUrl(value) {
  return value.trim().replace(/\/+$/, "") || "";
}

export function findSceneByUrl(value) {
  const normalizedUrl = normalizeBrowserUrl(value);

  return scenes.find((scene) => {
    const urls = scene.urls ?? [scene.url];
    return urls.some((url) => normalizeBrowserUrl(url) === normalizedUrl);
  });
}

export function findSceneForQuest(questId) {
  return scenes.find((scene) => scene.quests?.includes(questId));
}

export function createSceneState(scene) {
  return {
    ...scene,
    status: scene.status ?? "idle",
  };
}
