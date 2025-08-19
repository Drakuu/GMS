import transporter from '@/lib/emailConfig';
import { generateOTPEmail } from '@/lib/emailTemplates/otpEmail';

export async function sendOTPEmail(email, name, otp) {
   if (process.env.NODE_ENV !== 'production') {
      console.log(`[DEV] OTP for ${email}: ${otp}`);
      console.log(`Expires at: ${new Date(Date.now() + 7 * 60 * 1000)}`);
      return true;
   }
   try {
      const emailContent = generateOTPEmail(name, otp);

      const mailOptions = {
         from: `"Test App" <no-reply@testapp.com>`,
         to: email,
         subject: emailContent.subject,
         text: emailContent.text,
         html: emailContent.html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return { success: true };
   } catch (error) {
      console.error('Email error:', {
         code: error.code,
         command: error.command,
         stack: error.stack
      });
      return {
         success: false,
         error: 'Email service unavailable'
      };
   }
}