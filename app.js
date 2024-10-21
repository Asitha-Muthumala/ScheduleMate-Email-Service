const express = require("express");
const mail_route = require('./route/mail_routes');
const app = express();

const { PORT } = require('./utils/constant');

app.use(express.json());

app.use("/api/send", mail_route)

// Restrict invalid url's
app.all("*", (req, res, next) => {
    res.json({
        status: false,
        message: "url not found",
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});