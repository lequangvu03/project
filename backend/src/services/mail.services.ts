import nodemailer from 'nodemailer'
import { envConfig } from '~/constants/config'
class MailService {
  async sendVerificationEmail(userEmail: string, emailVerifyToken: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: envConfig.emailUsername,
        pass: envConfig.emailPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const verificationLink = `http://localhost:4000/api/auth/verify-email?token=${emailVerifyToken}`

    const mailOptions = {
      from: envConfig.emailUsername,
      to: userEmail,
      subject: 'Email Verification',
      html: `<p>Please click the link below to verify your email:</p><a href="${verificationLink}">Verify Email</a>`
    }

    await transporter.sendMail(mailOptions)
  }
  async sendOTPEmail(userEmail: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: envConfig.emailUsername,
        pass: envConfig.emailPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    const mailOptions = {
      from: envConfig.emailUsername,
      to: 'tung291203@gmail.com',
      subject: 'ForgotPassword Verification',
      html: `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Verification Code</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding: 10px 0;
                            border-bottom: 1px solid #dddddd;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                            color: #333333;
                        }
                        .content {
                            padding: 20px;
                            text-align: center;
                        }
                        .content p {
                            font-size: 18px;
                            color: #666666;
                        }
                        .otp {
                            display: inline-block;
                            margin: 20px 0;
                            padding: 10px 20px;
                            font-size: 24px;
                            font-weight: bold;
                            color: #ffffff;
                            background-color: #007BFF;
                            border-radius: 4px;
                            text-decoration: none;
                        }
                        .footer {
                            text-align: center;
                            padding: 10px 0;
                            border-top: 1px solid #dddddd;
                            font-size: 14px;
                            color: #999999;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Email Verification</h1>
                        </div>
                        <div class="content">
                            <p>Hello,</p>
                            <p>Your want to reset your password. Please use the following One Time Password (OTP) to complete your verification process:</p>
                            <div class="otp">${otp}</div>
<p>This OTP is valid for 120s.</p>
                        </div>
                        <div class="footer">
                            <p>If you did not request this code, please ignore this email.</p>
                            <p>Thank you,<br>Your Company Name</p>
                        </div>
                    </div>
                </body>
                </html>`
    }

    await transporter.sendMail(mailOptions)
  }
}
const mailService = new MailService()
export default mailService
