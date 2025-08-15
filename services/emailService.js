import transporter from '@/lib/emailConfig';
import { generateOTPEmail } from '@/utils/emailTemplates/otpEmail';

export async function sendOTPEmail(email, name, otp) {
   try {
      const emailContent = generateOTPEmail(name, otp);

      const mailOptions = {
         from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
         to: email,
         subject: emailContent.subject,
         text: emailContent.text,
         html: emailContent.html,
      };

      await transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${email}`);
      return true;
   } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
   }
}