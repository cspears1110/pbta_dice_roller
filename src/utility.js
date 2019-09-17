const {
    random,
    floor
} = require("mathjs")

exports.rollDice = function (mod) {
    let a = floor(random(0, 6) + 1);
    let b = floor(random(0, 6) + 1);
    let c = a + b + mod;
    return [a, b, c]
}

exports.mapReactionToMod = function (reaction) {
    switch (reaction) {
        case "minus3":
            return -3;
        case "minus2":
            return -2;
        case "minus1":
            return -1;
        case "plusminus0":
            return 0;
        case "plus1":
            return 1;
        case "plus2":
            return 2;
        case "plus3":
            return 3;
        case "plus4":
            return 4;
        default:
            return 0;
    }
}

exports.getEmbed = function (reaction, arr, name) {
    let mod = this.mapReactionToMod(reaction)
    let sign = (Math.sign(mod) !== -1 ? "+" : "");
    return ({
        color: this.MD_EMBED_BAR_COLOR,
        fields: [{
            name: "Markdown",
            value: "```" + "md" + "\n" + "# " + arr[2] + "\nDetails:[2d6" + sign + mod.toString() + " (" + arr[0] + " " + arr[1] + "), " + name + "]```"
        }],
    });
}

//ID of Custom Emoji on Server (\:name:)
exports.MINUS_THREE_ID = '619348136564883476';
exports.MINUS_TWO_ID = '619348136552431654';
exports.MINUS_ONE_ID = '619348136527265823';
exports.PLUS_MINUS_ZERO_ID = '619348136552562700';
exports.PLUS_ONE_ID = '619348136510619669';
exports.PLUS_TWO_ID = '619348136657289236';
exports.PLUS_THREE_ID = '619348136699101185';
exports.PLUS_FOUR_ID = '619348136732917810';

//Name of Custom Emoji on Server
exports.MINUS_THREE_NAME = 'minus3';
exports.MINUS_TWO_NAME = 'minus2';
exports.MINUS_ONE_NAME = 'minus1';
exports.PLUS_MINUS_ZERO_NAME = 'plusminus0';
exports.PLUS_ONE_NAME = 'plus1';
exports.PLUS_TWO_NAME = 'plus2';
exports.PLUS_THREE_NAME = 'plus3';
exports.PLUS_FOUR_NAME = 'plus4';

exports.REACTION_NAME_ARRAY = [this.MINUS_THREE_NAME, this.MINUS_TWO_NAME, this.MINUS_ONE_NAME, this.PLUS_MINUS_ZERO_NAME, this.PLUS_ONE_NAME, this.PLUS_TWO_NAME, this.PLUS_THREE_NAME, this.PLUS_FOUR_NAME]

exports.MD_EMBED_BAR_COLOR = 15236612;

exports.AWAIT_REACTION_TIME = 600000;