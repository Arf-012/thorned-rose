import { gameState } from "./game-state";
import { prologue } from "../scenes/prologue";

const scenes = {
  prologue,
};

export function getSceneById(sceneId) {
  return scenes[sceneId];
}

export function loadScene(sceneId = gameState.currentSceneId) {
  const scene = getSceneById(sceneId);

  if (!scene) {
    throw new Error(`Scene with ID "${sceneId}" not found.`);
  }

  gameState.currentSceneId = scene.id;

  return scene;
}

export function getCurrentDialogue() {
  const scene = loadScene();

  const dialogue = scene.dialogues[gameState.currentDialogue];

  if (!dialogue) {
    throw new Error(
      `Dialogue "${gameState.currentDialogue}" does not exist in scene "${scene.id}".`
    );
  }

  return dialogue;
}

export function loadDialogue(dialogueId) {
  const scene = loadScene();

  const dialogue = scene.dialogues[dialogueId];

  if (!dialogue) {
    throw new Error(
      `Dialogue "${dialogueId}" does not exist in scene "${scene.id}".`
    );
  }

  gameState.currentDialogue = dialogue.id;
  gameState.currentLine = 0;

  return dialogue;
}

export function nextLine() {
  const dialogue = getCurrentDialogue();

  const nextLineIndex = gameState.currentLine + 1;

  if (nextLineIndex >= dialogue.lines.length) {
    return false;
  }

  gameState.currentLine = nextLineIndex;

  return true;
}

export function nextDialogue(dialogueId) {
  return loadDialogue(dialogueId);
}