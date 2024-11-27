//https://dev.to/sheraz4194/sending-emails-in-nextjs-via-nodemailer-4ai2

"use server";
const nodemailer = require("nodemailer");
const {
  hostName,
  portNumber,
  emailUsername,
  emailPassword,
  siteEmail,
  siteFromEmail,
  siteName,
  copyright,
} = require("./variables");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: hostName,
  port: portNumber,
  //secure: true,
  auth: {
    user: emailUsername,
    pass: emailPassword,
  },
});

export async function sendMail({  sendTo, subject, message, name }) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error("Something Went Wrong", emailUsername, emailPassword, error);
    return;
  }
  const info = await transporter.sendMail({
    from: siteFromEmail,
    to: sendTo,
    subject: subject,
    html:
      `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Enquiry Notification</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
     <div style="margin: 0; padding: 0; font-family: 'Arial, sans-serif'; background-color: #fff;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #fff;">
                <!-- Header -->
                <tr>
                    <td style="background-color: #137E43; color: #fff; text-align: center; padding: 20px; font-size: 24px;">
                        ` + subject +
      `
                    </td>
                </tr>
                
                <!-- Body Content -->
                <tr>
                    <td style="background-color: #fff; padding: 20px; color: #15181E;">
                        <h2 style="font-size: 22px; color: #137E43;">Hi, `+name+`</h2>
                        <p style="font-size: 16px; line-height: 1.5;"> ` +
                        message +
      `. </p>
                         </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background-color: #15181E; color: #fff; text-align: center; padding: 10px; font-size: 14px;">
                        <p style="margin: 0;">${copyright}</p>
                    </td>
                </tr>
            </table>
        </div>
</body>
</html>
        
    `,
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", siteEmail);
  return info;
}
