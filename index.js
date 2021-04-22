const { Plugin } = require('powercord/entities');
const Settings = require("./Settings");
const { inject, uninject } = require("powercord/injector");
const generateEmojipasta = require("./generateEmojiPasta");
const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');
const getSettings = require("./getSettings");


module.exports = class Emojifier extends Plugin {
  async startPlugin() {
    // set the config if none is set
    if (!window.localStorage.getItem("excluded-server"))
      window.localStorage.setItem("excluded-server", "[]");
    if (!window.localStorage.getItem("excluded-channel"))
      window.localStorage.setItem("excluded-channel", "[]");
    if (!window.localStorage.getItem("excluded-channel"))
      this.loadStylesheet("style.scss");
      
    powercord.api.settings.registerSettings("emojify", {
      category: this.entityID,
      label: "Emojifier",
      render: Settings
    });

    setImmediate(async () => {
      const messageEvents = await getModule(["sendMessage"], true);
      if (!messageEvents)
        throw new ReferenceError("Failed to load message events");
      inject("emojifier-injection-id", messageEvents, "sendMessage", function (args) {
        const { getChannel } = getModule(["getChannel"], false);
        const emojiPasta = generateEmojipasta(args[1].content);
        const channel = getChannel(args[0]);
        const { exludedChannel, exludedServer } = getSettings();
        const excludedChannel = exludedChannel.map(e => e.split(/(\d+)/)[1]);
        const excludedServer = exludedServer.map(s => s.split(/(\d+)/)[1]);
        const isUserChannel = channel.type === 1;

        if (excludedChannel.includes(channel.id) || excludedServer.includes(channel.guild_id))
          return args;
        // block emote from dm
        for (const exclChannel of excludedChannel) {
          if (channel.recipients.includes(exclChannel))
            return args;
        }

        for (const server of excludedServer) {
          if (channel.recipients.includes(server))
            return args;
        }
        args[1].content = emojiPasta;
        return args;
      });
    });

  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("emojify");
    powercord.api.settings.unregisterCommand("emojify");
    uninject("emojifier-injection-id");
  }
};