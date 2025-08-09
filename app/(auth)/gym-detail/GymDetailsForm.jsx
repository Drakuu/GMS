"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function GymDetailsForm({ form, handleChange, prevStep, submitForm, loading }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">Gym Information</h1>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="">Gym Name</Label>
          <Input
            id=""
            name=""
            type="text"
            value={form}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            type="text"
            value={form}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            type="text"
            value={form}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="membershipPrice">Monthly Membership Price</Label>
          <Input
            id="membershipPrice"
            name="membershipPrice"
            type="number"
            value={form}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={prevStep}
          variant="outline"
          className="w-full"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={submitForm}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Submitting..." : "Complete Registration"}
        </Button>
      </div>
    </div>
  );
}