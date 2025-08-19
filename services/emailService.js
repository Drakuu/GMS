import nodemailer from 'nodemailer';

// Create a test account transporter (for development)
const devTransporter = nodemailer.createTransport({
   host: "sandbox.smtp.mailtrap.io",
   port: 587,
   secure: false,
   auth: {
      user: "edec73233892d9",
      pass: "0e4691ce32de18"
   }
});

// Production transporter configuration
const prodTransporter = nodemailer.createTransport({
   service: process.env.EMAIL_SERVICE || 'gmail',
   host: process.env.EMAIL_HOST,
   port: parseInt(process.env.EMAIL_PORT || '587'),
   secure: process.env.EMAIL_SECURE === 'true',
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
   },
   tls: {
      rejectUnauthorized: false // For testing only
   }
});

// Use appropriate transporter based on environment
const transporter = process.env.NODE_ENV === 'production' ? prodTransporter : devTransporter;

// Verify connection configuration
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
      from: `"${process.env.EMAIL_FROM_NAME || 'Gym Management System'}" <${process.env.EMAIL_FROM || 'info@mailtrap.club'}>`,
      to: email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
   };

   // Log the email data being sent
   console.log('Sending email with options:', {
      to: email,
      subject: emailContent.subject,
      otp: otp,
      expiry: new Date(Date.now() + 5 * 60 * 1000)
   });

   try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return { success: true };
   } catch (error) {
      console.error('Email send error:', {
         code: error.code,
         message: error.message,
         stack: error.stack
      });
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