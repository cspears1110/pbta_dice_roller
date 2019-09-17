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
exports.MINUS_THREE_ID = '';
exports.MINUS_TWO_ID = '';
exports.MINUS_ONE_ID = '';
exports.PLUS_MINUS_ZERO_ID = '';
exports.PLUS_ONE_ID = '';
exports.PLUS_TWO_ID = '';
exports.PLUS_THREE_ID = '';
exports.PLUS_FOUR_ID = '';

//Name of Custom Emoji on Server
exports.MINUS_THREE_NAME = '';
exports.MINUS_TWO_NAME = '';
exports.MINUS_ONE_NAME = '';
exports.PLUS_MINUS_ZERO_NAME = '';
exports.PLUS_ONE_NAME = '';
exports.PLUS_TWO_NAME = '';
exports.PLUS_THREE_NAME = '';
exports.PLUS_FOUR_NAME = '';

exports.REACTION_NAME_ARRAY = [this.MINUS_THREE_NAME, this.MINUS_TWO_NAME, this.MINUS_ONE_NAME, this.PLUS_MINUS_ZERO_NAME, this.PLUS_ONE_NAME, this.PLUS_TWO_NAME, this.PLUS_THREE_NAME, this.PLUS_FOUR_NAME]

exports.MD_EMBED_BAR_COLOR = 15236612;

exports.AWAIT_REACTION_TIME = 600000;