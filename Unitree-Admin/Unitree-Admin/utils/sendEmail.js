const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  try {
    console.log("✅ Loaded HOST:", process.env.EMAIL_SERVICE_HOST);
    console.log("✅ Loaded PORT:", process.env.EMAIL_SERVICE_PORT);
    console.log("✅ Sending email TO:", email);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE_HOST,
      port: process.env.EMAIL_SERVICE_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
      },
    });

    const mailOptions = {
      from: `"Unitree Admin" <shreekatkar3632@gmail.com>`, // ✅ MUST be your VERIFIED sender
      to: email,                                          // ✅ Receiver
      subject: subject,
      html: message,
    };
    

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully:", info.messageId);

    return { success: true };
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
    return { success: false };
  }
};

module.exports = sendEmail;
