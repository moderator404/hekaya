const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ] 
});

client.on('ready', () => {
    console.log(`✅ البوت جاهز باسم: ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const [action, orderId] = interaction.customId.split('-');
    const order = await Order.findOne({ orderId: parseInt(orderId) });

    if (action === 'accept') {
        interaction.user.send({
            embeds: [new MessageEmbed()
                .setTitle('✅ طلبك مقبول')
                .setDescription(`رقم الطلب: #${orderId}`)
                .setColor('#57F287')
            ]
        });
    } else if (action === 'reject') {
        interaction.user.send({
            embeds: [new MessageEmbed()
                .setTitle('❌ طلبك مرفوض')
                .setDescription(`رقم الطلب: #${orderId}`)
                .setColor('#ED4245')
            ]
        });
    }

    interaction.message.delete();
});

client.login(config.token);