

//https://dev.to/sheraz4194/sending-emails-in-nextjs-via-nodemailer-4ai2

'use server';
const nodemailer = require('nodemailer');
const { hostName, portNumber, emailUsername, emailPassword, siteEmail, siteFromEmail } = require('./variables');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: hostName,
  port: portNumber,
  //secure: true,
  auth: {
    user: emailUsername,
    pass: emailPassword,
  },
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error('Something Went Wrong', emailUsername, emailPassword, error);
    return;
  }
  const info = await transporter.sendMail({
    from: siteFromEmail,
    to: sendTo || siteEmail,
    subject: subject,
    text: text,
    html: html ? html : 'sdsdsdsddsdsdsd',

    // from: 'jaseerali2012@gmail.com',
    // to: 'jaseerali2012@gmail.com',
    // subject: 'test',
    // text: 'test',
    // html: 'test',


  });
  console.log('Message Sent', info.messageId);
  console.log('Mail sent to', siteEmail);
  return info;
}







// 'use server'



// import nodemailer from 'nodemailer';
// import { emailPassword, emailUsername, siteEmail, siteFromEmail } from './variables';


// export async function sendMail({

//     const { name, email, phone, message } = req.body;

//     // Create a transporter
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com', // Replace with your SMTP server
//       port: 587, // Replace with your SMTP port
//       auth: {
//         user: emailUsername, // Replace with your email address
//         pass: emailPassword, // Replace with your email password
//       },
//     });

//     const mailOptions = {
//       from: siteFromEmail,
//       to: siteEmail,
//       subject: 'New Contact Enquiry Received | Chuchoter',
//       html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Contact Enquiry Notification</title>
// </head>
// <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
//     <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//         <h2 style="color: #333333;">New Contact Enquiry Received</h2>
//         <p style="color: #555555;">Hi Admin,</p>
//         <p style="color: #555555;">We have received a new contact enquiry through our website. Below are the details:</p>
        
//         <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
//             <tr>
//                 <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Name:</td>
//                 <td style="padding: 8px; color: #333333;">[`+name+`]</td>
//             </tr>
//             <tr>
//                 <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Email:</td>
//                 <td style="padding: 8px; color: #333333;">[`+email+`]</td>
//             </tr>
//             <tr>
//                 <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Phone Number:</td>
//                 <td style="padding: 8px; color: #333333;">[`+phone+`]</td>
//             </tr>
//             <tr>
//                 <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Message:</td>
//                 <td style="padding: 8px; color: #333333;">[`+message+`]</td>
//             </tr>
//         </table>

//         <p style="color: #555555;">Please review the enquiry and respond accordingly.</p>
//         </div>
// </body>
// </html>`,
//     };

   
  