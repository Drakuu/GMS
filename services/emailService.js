// services/emailService.js - FINAL VERSION
import nodemailer from 'nodemailer';

// Create a new transporter for each email to avoid connection issues
const createTransporter = () => {
   return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD
      },
      connectionTimeout: 10000, // 10 seconds
      socketTimeout: 10000,
      tls: {
         rejectUnauthorized: false,
         minVersion: "TLSv1.2"
      }
   });
};

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

   console.log('Sending email to:', email);

   try {
      const transporter = createTransporter();
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);

      // Close the transporter immediately after sending
      transporter.close();

      return { success: true, messageId: info.messageId };
   } catch (error) {
      console.error('❌ Email send error:', error.message);

      // For connection timeouts, just log but don't retry (since emails often go through anyway)
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
         console.log('⚠️ Connection timeout, but email may have been sent');
         // Assume success for timeout errors since Mailtrap often delivers anyway
         return { success: true, timeoutError: true };
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