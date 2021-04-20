/** @type {import('../../../fake_node_modules/powercord/entities*/
const { Plugin } = require('powercord/entities');
const Settings = require("./Settings");
const { inject, uninject } = require("powercord/injector");
const generateEmojipasta = require("./generateEmojiPasta");
const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');


module.exports = class Emojifier extends Plugin {
  async startPlugin() {
    this.loadStylesheet("style.scss");
    powercord.api.settings.registerSettings("emojify", {
      category: this.entityID,
      label: "Emojifier",
      render: Settings
    });

    setImmediate(async () => {
      const messageEvents = await getModule(["sendMessage"], true);
      if (!messageEvents)
        throw new ReferenceError("Failed to load message events")

      inject("emojifier", messageEvents, "sendMessage", function (args) {
        const emojiPasta = generateEmojipasta(args[1].content)
        args[1].content = emojiPasta
        return args;
      });
    });

  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("emojify");
    powercord.api.settings.unregisterCommand("emojify");
    uninject("emojifier");
  }
};