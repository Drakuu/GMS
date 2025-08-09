"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function OtpVerificationForm({ 
  email, 
  otp, 
  handleOtpChange, 
  onSubmit, 
  onResendOtp, 
  loading 
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        We've sent a 6-digit code to{" "}
        <span className="font-medium text-primary">{email}</span>
      </p>

      <div className="space-y-2">
        <Label htmlFor="otp">Enter OTP</Label>
        <Input
          id="otp"
          name="otp"
          type="text"
          value={otp}
          onChange={handleOtpChange}
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          required
          className="text-center text-xl tracking-widest"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading || otp.length !== 6}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify Account"
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Didn't receive code?{" "}
        <Button
          type="button"
          variant="link"
          className="p-0 h-auto text-primary"
          onClick={onResendOtp}
          disabled={loading}
        >
          Resend OTP
        </Button>
      </div>
    </form>
  );
}