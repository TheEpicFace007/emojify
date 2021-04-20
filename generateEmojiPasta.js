const getSettings = require("./getSettings");
const EMOJI_MAPPINGS = require("./emojiMapping");

module.exports = function generateEmojipasta(text) {
    const paragraphs = text.split(/\n|\r\n/)
    let result = ""

    for (const paragraph of paragraphs) {
      var blocks = splitIntoBlocks(paragraph);
      var newBlocks = [];
      blocks.forEach(block => {
        newBlocks.push(block);
        emojis = generateEmojisFrom(block);
        if (emojis) {
          newBlocks.push(" " + emojis);
        }
      });

      result += newBlocks.join(" ") + "\n"
    }
    return result.trim()
  };

function splitIntoBlocks(text) {
  return text.match(/\s*[^\s]*/g);
}

function generateEmojisFrom(block) {
  var MAX_EMOJIS_PER_BLOCK = Number(getSettings().maxEmotePerWord) || 2;
  var trimmedBlock = trimNonAlphanumericalChars(block);
  var matchingEmojis = getMatchingEmojis(trimmedBlock);
  var emojis = [];
  if (matchingEmojis) {
    var numEmojis = Math.floor(Math.random() * (MAX_EMOJIS_PER_BLOCK + 1));
    for (var i = 0; i < numEmojis; i++) {
      emojis.push(matchingEmojis[Math.floor(Math.random() * matchingEmojis.length)]);
    }
  }
  return emojis.join("");
}

function trimNonAlphanumericalChars(text) {
  return text.replace(/^\W*/, "").replace(/\W*$/, "");
}

function getMatchingEmojis(word) {
  var key = getAlphanumericPrefix(word.toLowerCase());
  if (key in EMOJI_MAPPINGS) {
    return EMOJI_MAPPINGS[key];
  }
  return [];
}

function getAlphanumericPrefix(s) {
  return s.match(/^[a-z0-9]*/i);
}
