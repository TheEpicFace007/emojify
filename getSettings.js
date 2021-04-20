module.exports = function () {
  /** @type {string[]} */
  const excludedServer = window.localStorage.getItem("excluded-server")
    /** @type {string[]} */
    const excludedChannel = window.localStorage.getItem("excluded-channel")

  return {
    maxEmotePerWord: window.localStorage.getItem("max-emoji-per-word"),
    exludedServer: excludedServer, exludedChannel: excludedChannel
  }
}