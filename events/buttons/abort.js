module.exports = {
  name: "abortInteraction",
  async execute(interaction) {
    if (interaction.isButton()) {
      // Checks if the interaction is a button
      console.log(interaction);

      if (interaction.customId === "register_abort") {
        interaction.deferUpdate();
        // Check for the customId of the button
        console.log(
          `${interaction.user.tag} in #${interaction.channel.name} clicked the abort button.`
        );
      }
    }
  },
};
