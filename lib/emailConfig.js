import nodemailer from 'nodemailer';

// Create reusable transporter object using Ethereal Email
const transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
   port: 2525,
   secure: false,
   auth: {
      user: 'ernest.hackett7@ethereal.email',
      pass: 'JrPNM87keW7ku7tG9V'
   },
   tls: {
      rejectUnauthorized: false // For testing only!
   },
   connectionTimeout: 10000, // 10 seconds
   greetingTimeout: 10000,
   socketTimeout: 20000,
   logger: true,
   debug: true
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