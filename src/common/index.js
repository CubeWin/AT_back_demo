
const pwdBcrypt = require("./pwdBcrypt");
const genJWT = require("./genJWT");

module.exports = {
    ...pwdBcrypt,
    ...genJWT,
};
