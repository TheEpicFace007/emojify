module.exports = function () {
  if (!window.localStorage.getItem("excluded-server"))
    window.localStorage.setItem("excluded-server", "[]");
  if (!window.localStorage.getItem("excluded-channel"))
    window.localStorage.setItem("excluded-channel", "[]");
  if (!window.localStorage.getItem("max-emoji-per-word"))
    window.setItem("max-emoji-per-word", "2")
    
  /** @type {string[]} */
  const excludedServer = window.localStorage.getItem("excluded-server") ?? [];
  /** @type {string[]} */
  const excludedChannel = window.localStorage.getItem("excluded-channel") ?? [];

  return {
    maxEmotePerWord: window.localStorage.getItem("max-emoji-per-word") ?? 2,
    exludedServer: excludedServer, exludedChannel: excludedChannel
  };
}