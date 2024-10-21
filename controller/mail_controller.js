const { isEmpty } = require('../utils/object_isEmpty');
const { MAIL_MODEL } = require('../validation_model/mail');
const nodemailer = require('nodemailer');

const { EMAIL, EMAIL_SERVICE_PASSWORD } = require('../utils/constant');

exports.send_mail = (req, res, next) => {

    if (isEmpty(req.body)) {
        return res.json({
            status: false,
            message: "request data not found",
        })
    };

    try {

        const { error } = MAIL_MODEL.validate(req.body);

        if (error) {
            return res.json({
                status: false,
                message: "form field error",
                error: error.details[0].message
            })
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_SERVICE_PASSWORD,
            },
        });

        const mailOptions = {
            from: EMAIL,
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.content,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({
                    status: false,
                    message: "something went wrong",
                })
            } else {
                res.json({
                    status: true,
                    message: "successfully sent the mail",
                })
            }
        });

    }
    catch (err) {
        return res.json({
            status: false,
            message: "server error",
            error: err
        })
    }

}