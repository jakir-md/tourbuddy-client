"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Facebook } from "lucide-react";

// Import components we built
import SingleImageUploader from "@/components/SingleImageUploader"; // Use the one we fixed earlier
import {
  VerificationFormValues,
  verificationSchema,
} from "@/zod/verfication.validation";
import SelfieCapture from "@/components/shared/SelfieCapture";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/services/fileUpload/imageUpload";
import { verifyUserProfile } from "@/services/auth/verifyUserProfile";
import VerifiedProfileBadge from "./VerifiedBadge";
import VerificationPendingCard from "./VerificationPending";
import { useEffect, useState } from "react";
import VerificationRejectedCard from "./VerificationRejectionCard";
import { toast } from "sonner";

export default function VerificationForm({
  isVerified,
  message,
}: {
  isVerified: string | null;
  message?: string;
}) {
  const [startVerify, setStartVerify] = useState(isVerified ? false : true);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
  });

  const fbLink = watch("facebookProfileLink");

  const onSubmit = async (data: VerificationFormValues) => {
    const [selfieImage, nidBack, nidFront, utilityBill] = await Promise.all([
      uploadImage(data.selfieImage),
      uploadImage(data.nidBack),
      uploadImage(data.nidFront),
      uploadImage(data.utilityBill),
    ]);

    const uploadPayload = {
      ...data,
      selfieImage,
      nidFront,
      nidBack,
      utilityBill,
    };

    try {
      console.log("is verified status", isVerified);
      const result = await verifyUserProfile(uploadPayload);

      if (result.success) {
        toast.success("Verification Submitted Successfully.");
        setStartVerify(false);
      }
    } catch (error) {
      toast.error("Verification Submission.");
    }
  };

  // Mock Facebook Login Function
  const handleFacebookConnect = (profileLink: string) => {
    // In reality: Trigger OAuth popup -> Get Token -> Get Profile Link
    setTimeout(() => {
      setValue("facebookProfileLink", profileLink, { shouldValidate: true });
    }, 1000);
  };

  const handleOnRetry = () => {
    setStartVerify(true);
  };

  if (!startVerify && isVerified === "APPROVED") {
    return <VerifiedProfileBadge />;
  } else if (!startVerify && isVerified === "PENDING") {
    return <VerificationPendingCard />;
  } else if (!startVerify && isVerified === "REJECTED") {
    return (
      <VerificationRejectedCard onRetry={handleOnRetry} reason={message} />
    );
  } else
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Identity Verification</h1>
          <p className="text-slate-500">
            To ensure safety, we need to verify your identity before you can
            host trips.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* SECTION 1: LIVE SELFIE */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Live Selfie</CardTitle>
              <CardDescription>
                We match this photo with your NID.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                control={control}
                name="selfieImage"
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelfieCapture onCapture={onChange} error={error?.message} />
                )}
              />
            </CardContent>
          </Card>

          {/* SECTION 2: NATIONAL ID */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2: National ID (NID)</CardTitle>
              <CardDescription>
                Upload clear photos of both sides.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Front Side</label>
                <Controller
                  control={control}
                  name="nidFront"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <SingleImageUploader
                      onChange={onChange}
                      value={value}
                      error={error?.message}
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Back Side</label>
                <Controller
                  control={control}
                  name="nidBack"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <SingleImageUploader
                      onChange={onChange}
                      value={value}
                      error={error?.message}
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* SECTION 3: UTILITY BILL */}
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Address Proof</CardTitle>
              <CardDescription>
                Latest electricity or gas bill (max 3 months old).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                control={control}
                name="utilityBill"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <SingleImageUploader
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                  />
                )}
              />
            </CardContent>
          </Card>

          {/* SECTION 4: SOCIAL CONNECT */}
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Social Trust</CardTitle>
              <CardDescription className="p-0">
                Link your Facebook account to verify your online presence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="py-1">FB Group/Page Link</Label>
                <Controller
                  control={control}
                  name="fbPageLink"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      {" "}
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder="Give your page/group's link."
                      />{" "}
                      {error && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              {!fbLink ? (
                <Button
                  type="button"
                  onClick={() => handleFacebookConnect("https://facebook.com")}
                  className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 h-12 text-lg"
                >
                  <Facebook className="w-5 h-5 mr-2" /> Connect Facebook
                </Button>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <Facebook className="w-4 h-4" /> Account Linked
                  </span>
                  <span className="text-xs bg-green-200 px-2 py-1 rounded text-green-800">
                    Verified
                  </span>
                </div>
              )}
              {errors.facebookProfileLink && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.facebookProfileLink.message}
                </p>
              )}
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            className="w-full text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Uploading Documents..."
              : "Submit for Verification"}
          </Button>
        </form>
      </div>
    );
}
