# Thorned Rose

A visual novel project built with vanilla JavaScript, focused on narrative-driven gameplay, branching dialogue, and a modular game architecture.

> **Status:** In Development

---

## Overview

**Thorned Rose** is a narrative-driven visual novel project centered around dialogue, player choices, and story progression.

The project focuses on maintaining a clean separation between story data, game state, game logic, and presentation.

---

## Tech Stack

* **JavaScript** — Game logic and application code
* **Vite** — Development server and build tooling
* **HTML5** — Application structure
* **CSS3** — Interface and visual presentation
* **Git** — Version control

No game framework is currently used. The project uses vanilla JavaScript to keep the underlying architecture explicit and lightweight.

---

## Getting Started

### Prerequisites

Before installing the project, make sure you have the following installed:

* **Node.js** — Version 18 or later
* **npm** — Included with Node.js
* **Git**

You can verify your installations with:

```bash
node --version
npm --version
git --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/thorned-rose.git
```

Navigate into the project directory:

```bash
cd thorned-rose
```

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open the provided URL in your browser to run the game.

### Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```text
thorned-rose/
├── public/
│   └── images/
│       ├── backgrounds/
│       └── characters/
│
├── src/
│   ├── engine/
│   │   ├── game-state.js
│   │   └── scene-manager.js
│   │
│   ├── scenes/
│   │   └── prologue.js
│   │
│   ├── ui/
│   │   └── game-screen.js
│   │
│   ├── main.js
│   └── style.css
│
├── index.html
├── package.json
└── README.md
```

---

## Architecture

The project separates story data, game state, game logic, and presentation.

```text
Story Data
     │
     ▼
Scene Manager
     │
     ▼
Game State
     │
     ▼
UI Rendering
```

### Story Data

Located in:

```text
src/scenes/
```

Contains static narrative information:

* Scenes
* Dialogues
* Dialogue lines
* Choices

Story data should remain independent from the UI.

---

### Game State

Located in:

```text
src/engine/game-state.js
```

Stores the current runtime state of the game.

```js
export const gameState = {
  currentSceneId: 'prologue',
  currentDialogue: 'intro',
  currentLine: 0,

  flags: {},

  relationships: {},

  inventory: [],
}
```

The game state represents **where the player currently is**, while the scene files represent **what content exists**.

---

### Scene Manager

Located in:

```text
src/engine/scene-manager.js
```

Responsible for controlling progression through the story.

Current responsibilities include:

* Loading scenes
* Loading dialogues
* Retrieving the current dialogue
* Advancing dialogue lines
* Changing dialogues

The scene manager does not manipulate the DOM.

---

### UI

Located in:

```text
src/ui/game-screen.js
```

Responsible for presenting the current game state.

Current responsibilities include:

* Scene presentation
* Character presentation
* Dialogue presentation
* Choice presentation
* User interaction

The UI communicates with the engine rather than implementing the story logic itself.

---

## Current Dialogue Flow

The current dialogue system follows a simple:

```text
Scene
  └── Dialogue
       └── Lines
```

A dialogue may also contain choices:

```text
Dialogue
├── Lines
└── Choices
```

Example flow:

```text
Riku:
"Where... am I?"

        ↓

???:
"Finally, you are awake."

        ↓

Riku:
"..."

        ↓

Choices

├── "Who... are you?"
└── "Where am I?"
```

The `...` is intentionally used as a response placeholder. The choices represent possible responses from the player-controlled character.

---

# Architecture & Design Decisions

## Why Vanilla JavaScript?

The project currently uses vanilla JavaScript instead of a game framework or frontend framework.

This keeps the fundamental game architecture explicit:

```text
State → Logic → Rendering
```

It also avoids introducing abstractions before they provide meaningful value.

A framework may be considered later if the project's UI or state management complexity justifies it.

---

## Why Separate `game-state.js` and `scene-manager.js`?

The game state and the systems that manipulate it have different responsibilities.

### `game-state.js`

Answers:

> "What is the current state of the game?"

### `scene-manager.js`

Answers:

> "How do we move from one state of the story to another?"

Keeping them separate prevents the state object from becoming a collection of functions and keeps progression logic centralized.

---

## Why Separate Story Data From the UI?

Story content is stored in:

```text
src/scenes/
```

rather than directly inside the rendering code.

This allows the same UI to render different scenes without changing the presentation logic.

For example:

```text
prologue.js
chapter-1.js
chapter-2.js
```

can all follow the same data structure while being rendered by the same engine.

This becomes particularly important once the game contains many dialogues and branching paths.

---

## Why Use CSS Grid Instead of Flexbox for the Dialogue Box?

The dialogue box has a deliberate three-column structure:

```text
┌────────────────────────┬──────┬───────────────────┐
│                        │      │                   │
│ Dialogue Area          │      │ Mechanics Area   │
│                        │      │                   │
└────────────────────────┴──────┴───────────────────┘
```

The layout is implemented using:

```css
grid-template-columns: 1fr 2px 1fr;
```

This was chosen over Flexbox because the interface represents a **defined two-column layout with a fixed divider**, rather than a collection of items that primarily need flexible distribution.

Grid makes the intended structure explicit:

```text
1fr → dialogue
2px → separator
1fr → mechanics
```

It also makes future proportion changes straightforward:

```css
1fr 2px 1fr
```

for 50/50, or:

```css
3fr 2px 2fr
```

for approximately 60/40.

Flexbox could achieve a similar result, but Grid communicates the layout relationship more directly.

---

## Why Use Grid Inside the Dialogue Area?

The dialogue section itself has two distinct columns:

```text
┌──────────────┬─────────────────────────────┐
│              │                             │
│  Character   │       Dialogue Content      │
│              │                             │
└──────────────┴─────────────────────────────┘
```

Therefore it also uses CSS Grid:

```css
grid-template-columns: 180px 1fr;
```

This keeps the character area predictable while allowing the dialogue content to consume the remaining space.

---

## Why Use `object-fit: cover` for Backgrounds?

Background images are intended to fill the entire scene.

```css
object-fit: cover;
```

allows the image to fill its container while preserving its aspect ratio.

Some cropping may occur, which is preferable to leaving empty space around the scene.

---

## Why Use `object-fit: contain` for Characters?

Character sprites should remain fully visible.

Therefore character images use:

```css
object-fit: contain;
```

Unlike the background, the character should not be cropped simply because the viewport has a different aspect ratio.

In short:

```text
Background → cover
Character  → contain
```

---

## Why Are Choices Separate From the Dialogue Box?

Choices are treated as a separate interaction layer.

```text
Scene
│
├── Character
├── Dialogue
├── Mechanics
│
└── Choices
```

This allows choices to appear over the scene without replacing or restructuring the dialogue interface.

The dialogue box can continue displaying:

```text
Riku
...
```

while the available responses appear above the scene.

This also leaves room for future choice presentation without tightly coupling it to the dialogue box.

---

## Why Use `:hover` and `:active`?

The two pseudo-classes represent different interaction states.

### `:hover`

Used when the cursor is positioned over a choice.

It provides visual feedback that the element is interactive.

### `:active`

Used while the choice is being physically pressed.

It provides immediate press feedback.

Neither state represents persistent game selection.

The actual choice is processed by JavaScript through the button's `click` event.
