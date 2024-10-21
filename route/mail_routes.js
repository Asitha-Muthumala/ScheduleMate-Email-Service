const express = require('express');
const { send_mail } = require('../controller/mail_controller');

const router = express.Router();

router.route("/mail").post(send_mail);

module.exports = router;