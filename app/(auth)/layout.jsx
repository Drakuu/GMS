"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({ children, title }) {
  return (
    <div className="my-auto min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-fit">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
      <Toaster position="top-center" />
    </div>
  );
}