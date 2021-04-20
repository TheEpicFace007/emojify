const getSettings = require("./getSettings");

function generateEmojipasta(text) {
  const blocks = splitIntoBlocks(text);
  const newBlocks = [];
  blocks.forEach(block => {
      newBlocks.push(block);
      emojis = generateEmojisFrom(block);
      if (emojis) {
          newBlocks.push(" " + emojis);
      }
  });
  return newBlocks.join("");
}

function splitIntoBlocks(text) {
  return text.match(/\s*[^\s]*/g);
}

function generateEmojisFrom(block) {

  const trimmedBlock = trimNonAlphanumericalChars(block);
  const matchingEmojis = getMatchingEmojis(trimmedBlock);
  const emojis = [];
  if (matchingEmojis) {
      const numEmojis = Math.floor(Math.random() * (MAX_EMOJIS_PER_BLOCK + 1));
      for (let i = 0; i < numEmojis; i++) {
          emojis.push(matchingEmojis[Math.floor(Math.random() * matchingEmojis.length)]);
      }
  }
  return emojis.join("");
}

function trimNonAlphanumericalChars(text) {
  return text.replace(/^\W*/, "").replace(/\W*$/, "");
}

function getMatchingEmojis(word) {
  const key = getAlphanumericPrefix(word.toLowerCase());
  if (key in EMOJI_MAPPINGS) {
      return EMOJI_MAPPINGS[key];
  }
  return [];
}

function getAlphanumericPrefix(s) {
  return s.match(/^[a-z0-9]*/i);
}
