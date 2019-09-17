const Discord = require("discord.js");
const client = new Discord.Client();
const logger = require("winston");
const {
    prefix,
    token
} = require("./config.json");

var utils = require("./utility");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true
});
logger.level = "debug";

client.on("ready", () => {
    logger.info(`Logged in as ${client.user.tag}`);
});

client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "pbta") {
        message.delete();
        message.channel
            .send("PbtA Dice Roller -  Please select a modifier to roll with:")
            .then(message => {
                message
                    .react(utils.MINUS_THREE_ID)
                    .then(() => message.react(utils.MINUS_TWO_ID))
                    .then(() => message.react(utils.MINUS_ONE_ID))
                    .then(() => message.react(utils.PLUS_MINUS_ZERO_ID))
                    .then(() => message.react(utils.PLUS_ONE_ID))
                    .then(() => message.react(utils.PLUS_TWO_ID))
                    .then(() => message.react(utils.PLUS_THREE_ID))
                    .then(() => message.react(utils.PLUS_FOUR_ID))
                    .then(() => {
                        setTimeout(() => {
                            let tag = '';
                            const filter = (reaction, user) => {
                                tag = user.username;
                                return utils.REACTION_NAME_ARRAY.includes(reaction.emoji.name);
                            };
                            message
                                .awaitReactions(filter, {
                                    max: 1,
                                    time: utils.AWAIT_REACTION_TIME,
                                    errors: ["time"]
                                })
                                .then(collected => {
                                    const reaction = collected.first();
                                    let temp = utils.rollDice(utils.mapReactionToMod(reaction.emoji.name));
                                    let embed = utils.getEmbed(reaction.emoji.name, temp, tag);
                                    message.delete();
                                    message.channel.send({
                                        embed: embed
                                    });
                                    return message.channel.send("!pbta");
                                })
                                .catch(collected => {
                                    message.channel.send(
                                        "Error occurred. Shutting down PbtA Dice Roller Instance. Please re-instance with '!pbta'"
                                    );
                                });
                        }, 500);
                    });
            });
    } else {
        logger.info(`Command not recognized. Input recieved: ${command}`);
    }
});

client.login(token);
