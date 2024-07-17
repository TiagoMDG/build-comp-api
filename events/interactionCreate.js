const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    } else if (interaction.isButton()) {
      if (interaction.customId == "register_abort") {
        // Delete a channel
        try {
          await interaction.channel.delete({
            reason: "it sucks",
          });
          await interaction.reply("Text channel deleted successfully!");
        } catch (error) {
          console.error("Error creating thread:", error);
          await interaction.reply(
            "There was an error trying to create a thread."
          );
        }
      } else if (interaction.customId == "register_submit") {
      } else if (interaction.customId == "register_author") {
      }
    }
  },
};
