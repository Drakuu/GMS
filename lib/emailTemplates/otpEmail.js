export function generateOTPEmail(name, otp) {
   return {
      subject: `Your OTP for Login - ${otp}`,
      text: `Hi ${name},\n\nYour OTP is ${otp}. This OTP is valid for 5 minutes.\n\nIf you didn't request this, please ignore this email.\n\nThanks,\nThe Team`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${name},</h2>
        <p>Your OTP is: <strong style="font-size: 1.2em;">${otp}</strong></p>
        <p>This OTP is valid for 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #777;">Thanks,<br>The Team</p>
      </div>
    `
   };
}