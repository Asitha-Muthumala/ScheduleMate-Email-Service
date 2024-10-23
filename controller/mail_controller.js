const { isEmpty } = require("../utils/object_isEmpty");
const { MAIL_MODEL } = require("../validation_model/mail");
const nodemailer = require("nodemailer");

const { EMAIL, EMAIL_SERVICE_PASSWORD } = require("../utils/constant");

exports.send_mail = (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.json({
      status: false,
      message: "request data not found",
    });
  }

  try {
    const { error } = MAIL_MODEL.validate(req.body);

    if (error) {
      return res.json({
        status: false,
        message: "form field error",
        error: error.details[0].message,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: EMAIL,
        pass: EMAIL_SERVICE_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                    
                    <div style="background-color: #ffffff; margin: 20px auto; padding: 20px; border-radius: 10px; max-width: 600px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <div style="background-color: #4CAF50; padding: 15px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px; color: #ffffff;">
                    <h1 style="margin: 0; font-size: 24px;">Important Account Updates</h1>
                    </div>
                    
                        <!-- Body -->
                    <div style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                    <p>Dear User,</p>
                    <p>${req.body.content}</p>
                    <p style="margin-top: 20px;">Best regards,</p>
                    <p>The Support Team</p>
                    </div>
                    
                        <!-- Footer -->
                    <div style="background-color: #f1f1f1; padding: 10px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; color: #888888; font-size: 14px;">
                    <p>For further assistance, feel free to <a href="mailto:support@yourwebsite.com" style="color: #4CAF50; text-decoration: none;">contact support</a>.</p>
                    </div>
                    </div>
                    
                    </body>
                    </html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({
          status: false,
          message: "something went wrong",
        });
      } else {
        res.json({
          status: true,
          message: "successfully sent the mail",
        });
      }
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "server error",
      error: err,
    });
  }
};
