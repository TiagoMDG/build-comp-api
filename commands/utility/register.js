const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const exampleEmbed = {
  id: 652627557,
  title: "Build Competition Submission",
  description: "Authors: ${authors}\nCoordinates: ${coords}\n\n",
  color: 2326507,
  fields: [],
};

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("register_submit")
    .setLabel("Submit")
    .setStyle(ButtonStyle.Success), // Style 3
  new ButtonBuilder()
    .setCustomId("register_author")
    .setLabel("Add Author")
    .setStyle(ButtonStyle.Primary), // Style 1
  new ButtonBuilder()
    .setCustomId("register_coords")
    .setLabel("Enter Coordinates")
    .setStyle(ButtonStyle.Primary), // Style 1
  new ButtonBuilder()
    .setCustomId("register_abort")
    .setLabel("Abort")
    .setStyle(ButtonStyle.Danger) // Style 4
);

const exampleComponent = {
  components: [
    {
      id: 983242500,
      type: 1,
      components: [
        {
          id: 815797154,
          type: 2,
          style: 3,
          label: "Submit ",
          disabled: false,
          action_set_id: "337908113",
        },
        {
          id: 100809363,
          type: 2,
          style: 1,
          label: "Add Author",
          action_set_id: "761432492",
        },
        {
          id: 696952441,
          type: 2,
          style: 1,
          label: "Enter Coordinates",
          action_set_id: "802063996",
        },
        {
          id: 190457283,
          type: 2,
          style: 4,
          label: "Abort",
          action_set_id: "753622331",
        },
      ],
    },
  ],
  actions: {
    337908113: {
      actions: [],
    },
    753622331: {
      actions: [],
    },
    761432492: {
      actions: [],
    },
    802063996: {
      actions: [],
    },
  },
};

const exampleAction = {
  actions: {
    337908113: {
      actions: [],
    },
    753622331: {
      actions: [],
    },
    761432492: {
      actions: [],
    },
    802063996: {
      actions: [],
    },
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register a build for the competition!")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title of your build")
        .setRequired(true)
        .setMinLength(3)
        .setMaxLength(50)
    ),
  async execute(interaction) {
    // Get the guild
    const guild = interaction.client.guilds.cache.get("1263077356818661387");
    // Get channel
    const channelToDelete = interaction.client.channels.cache.get("1263149356211503127");
    // Get everybody role id
    const everyoneRole = guild.roles.everyone.id;
    // Parse options
    const title = interaction.options.getString("title")

    try {
      const channel = await guild.channels.create({
        name: `${title}-submission`,
        type: 0,
        parent: "1263077357619777638",
        permissionOverwrites: [
          {
            type: 1,
            id: interaction.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.AttachFiles,
            ],
          },
          {
            type: 0,
            id: everyoneRole,
            deny: [PermissionFlagsBits.ViewChannel],
          },
        ],
      });

      channel.send({ embeds: [exampleEmbed], components: [row] });
      await interaction.reply({content:"Submission channel created successfully!", ephemeral:true});
    } catch (error) {
      console.error("Error creating thread:", error);
      await interaction.reply("There was an error trying to create a thread.");
    }

    // Delete a channel

    // try {
    // 	await channelToDelete.delete({
    // 		reason: "it sucks",
    // 	});

    // 	await interaction.reply('Text channel deleted successfully!');
    // } catch (error) {
    // 	console.error('Error creating thread:', error);
    // 	await interaction.reply('There was an error trying to create a thread.');
    // }
  },
};
