const { Events, ThreadAutoArchiveDuration } = require("discord.js");

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
            reason: "Build Competition: Aborted",
          });
          await interaction.reply({content:"Submission channel created!", ephemeral:true});
        } catch (error) {
          console.error("Error arborting submission: ", error);
          await interaction.reply({content:"Could not create submission channel!", ephemeral:true});
        }

      } else if (interaction.customId == "register_submit") {
        // Retrieve backend stuff (please implement)
        const title = "placeholder";
        const entry_id = 69; 

        // Create forum post
        const forum = interaction.client.channels.cache.get(
          "1263083208778579999"
        );

        try {
          await forum.threads.create({
            name: `${title}`,
            message: "Placeholder",
            autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
            reason: `Build Competition: Entry ${entry_id} submitted`
          });
          await interaction.reply({content:"Thread submitted!", ephemeral:true});

        } catch(error) {
          console.error("Error creating thread: ", error);
          await interaction.reply({content:"Could not create thread!", ephemeral:true});
        }

      } else if (interaction.customId == "register_author") {
      }
    }
  },
};
