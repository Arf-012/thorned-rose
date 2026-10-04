export const prologue = {
  id: "prologue",

  dialogues: {
    intro: {
      id: "intro",

      lines: [
        {
          speaker: "Riku",
          text: "Where... am I?",
        },

        {
          speaker: "???",
          text: "You finally woke up.",
        },
      ],

      choices: [
        {
          text: "Who are you?",
          nextDialogue: "meet-stranger",
        },

        {
          text: "Where am I?",
          nextDialogue: "ask-location",
        },
      ],
    },

    "meet-stranger": {
      id: "meet-stranger",

      lines: [
        {
          speaker: "Riku",
          text: "Who are you?",
        },

        {
          speaker: "???",
          text: "That's a rather complicated question.",
        },
      ],

      choices: [],
    },

    "ask-location": {
      id: "ask-location",

      lines: [
        {
          speaker: "Riku",
          text: "Where am I?",
        },

        {
          speaker: "???",
          text: "Somewhere you weren't supposed to be.",
        },
      ],

      choices: [],
    },
  },
};