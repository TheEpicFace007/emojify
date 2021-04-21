/** @type {import('../../../fake_node_modules/powercord/entities*/
const { Plugin } = require('powercord/entities');
const Settings = require("./Settings");
const { inject, uninject } = require("powercord/injector");
const generateEmojipasta = require("./generateEmojiPasta");
const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');
const getSettings = require("./getSettings");


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
        const { getChannel } = getModule(["getChannel"], false);
        const emojiPasta = generateEmojipasta(args[1].content)
        const channel = getChannel(args[0]);
        const { exludedChannel, exludedServer} = getSettings()
        if (exludedChannel.includes(channel.id) || exludedServer.includes(channel.guild_id))
          return args
        
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