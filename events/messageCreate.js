const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client, prefix, openai) {
        console.log(openai)
        const user = message.author;
        const guild = message.guild;

        console.log(`${user.tag} in #${message.channel.name} sent: ${message.content}`);

        if (user.bot) return;


        switch(user.id){
            case "":
                await message.reply(user.name);
                break;

            case "":
                await message.reply('blah blah blah');
    
                const invite = await message.channel.createInvite({
                    maxAge: 86400,
                    maxUses: 1,
                    unique: true,
                });
    
                await user.send(`You have been banned from ${guild.name}. Here is an invite back: ${invite.url}`);
    
                await guild.members.kick(user.id);
                break;
            case "":
                const content = `in the tone of a 50s fast talking Italian American gangster create an insult for someone named ${user.name}`
                const response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            // name: 
                            role: 'user',
                            content: content
                        }
                    ]
                }).catch((error) => console.error('openAI Error:\n', error))
                message.reply(response)
                console.log(response);
                break;
        }



    },
};
