const nodemailer = require("nodemailer");

module.exports = {
  sendEmailNotification: (req, res) => {
    const db = req.app.get("db");
    console.log("email hit")
    db.send_email([
      req.body.email,
      req.body.emailSender,
      req.body.emailReceiver
    ]).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    let mailOptions = {};

    mailOptions = {
      from: "yousufdaramay@yahoo.com",
      to: "yusefdaramay@yahoo.com",
      subject: "A comment on your post",
      text: "Something Happened",
      html: `<b>Somebody commented on your Post!</b>
                This is the email: ${req.body.email}
          `
    };

    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.log("Error", err);
      }
    });
  }
};
