import { gameState } from '../engine/game-state'
import {
  getCurrentDialogue,
  loadDialogue,
  nextLine
} from '../engine/scene-manager'

export function renderGameScreen () {
  const app = document.querySelector('#app')

  if (!app) {
    throw new Error('App element not found.')
  }

  const dialogue = getCurrentDialogue()
  const line = dialogue.lines[gameState.currentLine]

  app.innerHTML = `
    <main class='game-screen'>
      <section class='scene-background'>
        <div class='scene-placeholder'>SCENE BACKGROUND</div>
      </section>

      <section class='dialogue-choices'>${renderChoices(dialogue)}</section>

      <section class='dialogue-box'>
        <div class='dialogue-area'>
          <div class='character-area'>
            <div class='character-icon'>ICON</div>
          </div>

          <div class='dialogue-content'>
            <div class='speaker-name'>${line?.speaker ?? ''}</div>

            <div class='line-separator-horizontal'></div>

            <div class='dialogue-text'>${line?.text ?? ''}</div>
          </div>
        </div>

        <div class='line-separator-vertical'></div>

        <aside class='mechanics-area'></aside>
      </section>
    </main>
  `

  bindChoiceEvents()
  bindDialogueEvents()
}

function renderChoices (dialogue) {
  const isLastLine = gameState.currentLine === dialogue.lines.length - 1

  if (!isLastLine || !dialogue.choices?.length) {
    return ''
  }

  return dialogue.choices
    .map(
      choice => `
        <button
          class="dialogue-choice"
          data-next-dialogue="${choice.nextDialogue}"
        >
          ${choice.text}
        </button>
      `
    )
    .join('')
}

function bindChoiceEvents () {
  const choices = document.querySelectorAll('.dialogue-choice')

  choices.forEach(choice => {
    choice.addEventListener('click', () => {
      const nextDialogue = choice.dataset.nextDialogue

      if (!nextDialogue) {
        return
      }

      loadDialogue(nextDialogue)
      renderGameScreen()
    })
  })
}

function bindDialogueEvents () {
  const dialogueBox = document.querySelector('.dialogue-box')

  if (!dialogueBox) {
    return
  }

  dialogueBox.addEventListener('click', () => {
    const advanced = nextLine()

    if (advanced) {
      renderGameScreen()
    }
  })
}
