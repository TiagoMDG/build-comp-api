const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register a build for the competition!'),
	async execute(interaction) {
		const channel = interaction.client.channels.cache.get('1263083208778579999');
		
		if (!channel) {
			console.error('Channel not found!');
			await interaction.reply('There was an error finding the channel.');
			return;
		}

		try {
			await channel.threads.create({
				name: `${interaction.user.displayName}'s Entry`,
				autoArchiveDuration: 60, // auto archive after 1 hour (60 minutes)
                message: 'This is a message',
				reason: 'A thread for the competition',
			});

			await interaction.reply('Thread created successfully!');
		} catch (error) {
			console.error('Error creating thread:', error);
			await interaction.reply('There was an error trying to create a thread.');
		}
	},
};
