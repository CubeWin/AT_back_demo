const fs = require("fs");
const { Router } = require("express");

const router = Router();

fs.readdirSync(`${__dirname}/`).filter((f) => {
    const routeFile = f.split(".").slice(0, -1).join(".").toString();

    return routeFile !== "index" && f !== ".DS_Store"
        ? router.use(`/${routeFile}`, require(`./${routeFile}`))
        : null;
});
// 404
router.use("*", (req, res) => {
    res.status(404).json({
        erros: {
            msg: "URL_NOT_FOUND",
        },
    });
});

module.exports = router;
