'use server'

import { copyright } from "../Utils/variables"


export async function emailTemplate ({title, body}) { 
    return `
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
                        ${title || 'Welcome to Our Service'}
                    </td>
                </tr>
                
                <!-- Body Content -->
                <tr>
                    <td style="background-color: #fff; padding: 20px; color: #15181E;">
                        <h2 style="font-size: 22px; color: #137E43;">Hi [Recipient Name],</h2>
                        <p style="font-size: 16px; line-height: 1.5;">Thank you for signing up with us! We're excited to have you on board. Here’s what you can expect:</p>
                        <ul style="font-size: 16px; line-height: 1.5; color: #15181E;">
                            <li>Exclusive access to new features</li>
                            <li>Priority support</li>
                            <li>Special offers just for you</li>
                        </ul>
                        <p style="font-size: 16px; line-height: 1.5;">If you have any questions, feel free to reach out to us anytime.</p>
                        <a href="#" style="background-color: #137E43; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; display: inline-block; margin-top: 20px;">
                            Get Started
                        </a>
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
        
    `
}
