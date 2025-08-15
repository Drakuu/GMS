import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: process.env.EMAIL_PORT || 587,
   secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
   },
});

// Verify connection configuration
transporter.verify((error) => {
   if (error) {
      console.error('Email server connection error:', error);
   } else {
      console.log('✅ Email server is ready to send messages');
   }
});

export default transporter;