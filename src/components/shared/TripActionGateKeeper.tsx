import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, LogIn, Lock, ScanFace } from "lucide-react";

interface GatekeeperProps {
  isLoggedIn?: boolean;
  isVerified?: boolean;
}

export default function TripActionGatekeeper({
  isLoggedIn,
  isVerified,
}: GatekeeperProps) {
  if (!isLoggedIn) {
    return (
      <Card className="md:border-blue-100 border-0 bg-blue-50/50 shadow-sm">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <LogIn className="w-6 h-6 text-blue-600 ml-1" />
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-900">
              Log in to Join this Trip
            </h3>
            <p className="text-sm text-slate-600 max-w-xs mx-auto">
              You need a TravelBuddy account to book seats, chat with hosts, and
              see full itineraries.
            </p>
          </div>

          <Button
            asChild
            className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 gap-2 font-semibold"
          >
            <Link href="/login">Login / Register</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!isVerified) {
    return (
      <Card className="border-0 md:rounded-md rounded-none md:border-amber-200 bg-amber-50/40 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-100 rounded-full blur-2xl opacity-50" />

        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="bg-white p-3 rounded-full border border-amber-100 shadow-sm shrink-0">
            <ScanFace className="w-8 h-8 text-amber-600" />
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="font-bold text-lg text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              Identity Verification Required
              <Lock className="w-4 h-4 text-amber-500" />
            </h3>
            <p className="text-sm text-slate-600">
              To ensure safety for everyone, we require all travelers to verify
              their identity before joining a trip.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Button
              asChild
              className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-2 shadow-md"
            >
              <Link href="/dashboard/verification">
                <ShieldCheck className="w-4 h-4" />
                Verify Identity
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  return null;
}
