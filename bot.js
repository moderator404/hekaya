const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] 
});

client.on('ready', () => {
    console.log('✅ البوت جاهز!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    // إنشاء روم خاص للطلب
    const channel = await interaction.guild.channels.create(`طلب-${interaction.user.username}`, {
        type: 'GUILD_TEXT',
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: interaction.user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }
        ]
    });

    // إرسال الإمبد مع المنشن
    const embed = new MessageEmbed()
        .setTitle('📦 طلب جديد')
        .setDescription(`${interaction.user} طلب المنتج`)
        .setColor('#57F287');

    channel.send({ 
        content: `@${interaction.user.username}`, 
        embeds: [embed] 
    });

    interaction.reply({ 
        content: `تم إنشاء روم الدعم: ${channel}`, 
        ephemeral: true 
    });
});

client.login(process.env.DISCORD_TOKEN);