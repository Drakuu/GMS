// services/emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: parseInt(process.env.EMAIL_PORT || '587'),
   secure: process.env.EMAIL_SECURE === 'true',
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
   },
   // Add connection timeout settings
   connectionTimeout: 10000, // 10 seconds
   socketTimeout: 10000,     // 10 seconds
   // Add retry logic
   maxConnections: 5,
   maxMessages: 100,
   // ✅ ADD TLS OPTIONS FOR BETTER CONNECTIVITY
   tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2"
   }
});

transporter.verify((error) => {
   if (error) {
      console.error('Email server connection error:', error);
   } else {
      console.log('✅ Email server is ready to send messages');
   }
});

export async function sendOTPEmail(email, name, otp) {
   const emailContent = generateOTPEmail(name, otp);

   const mailOptions = {
      from: {
         name: process.env.EMAIL_FROM_NAME,
         address: process.env.EMAIL_FROM
      },
      to: email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
   };

   console.log('Sending email with options:', {
      to: email,
      subject: emailContent.subject,
      from: mailOptions.from
   });

   try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return { success: true, messageId: info.messageId };
   } catch (error) {
      console.error('Email send error:', {
         code: error.code,
         message: error.message,
         stack: error.stack
      });

      // Retry logic for connection timeouts
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
         console.log('Retrying email send due to connection error...');
         try {
            // Close and recreate transporter
            await transporter.close();
            const newTransporter = nodemailer.createTransport({
               host: process.env.EMAIL_HOST,
               port: parseInt(process.env.EMAIL_PORT || '587'),
               secure: process.env.EMAIL_SECURE === 'true',
               auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASSWORD
               },
               connectionTimeout: 15000,
               socketTimeout: 15000
            });

            const retryInfo = await newTransporter.sendMail(mailOptions);
            console.log('Retry successful - Message sent: %s', retryInfo.messageId);
            return { success: true, messageId: retryInfo.messageId };
         } catch (retryError) {
            console.error('Retry also failed:', retryError.message);
            return {
               success: false,
               error: retryError.message,
               retryFailed: true
            };
         }
      }

      return {
         success: false,
         error: error.message
      };
   }
}

export function generateOTPEmail(name, otp) {
   return {
      subject: `Your OTP for Gym Management System - ${otp}`,
      text: `Hi ${name},\n\nYour OTP is ${otp}. This OTP is valid for 5 minutes.\n\nIf you didn't request this, please ignore this email.\n\nThanks,\nGym Management System Team`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Hi ${name},</h2>
      <p>Your OTP for Gym Management System is: <strong style="font-size: 1.2em; color: #2563eb;">${otp}</strong></p>
      <p>This OTP is valid for 5 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #777;">Thanks,<br>Gym Management System Team</p>
    </div>
    `
   };
}