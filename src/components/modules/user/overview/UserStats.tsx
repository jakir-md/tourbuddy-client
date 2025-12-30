import { Card, CardContent } from "@/components/ui/card";
import { Map, Ticket } from "lucide-react";

interface AnalyticsData {
  tripsCreated: number;
  tripsJoined: number;
}

export default function UserStats({ data }: { data: AnalyticsData }) {
  return (
    <div className="grid mt-4 grid-cols-2 gap-4 mb-8">
      <Card className="rounded-md bg-blue-50 border-blue-100 shadow-sm">
        <CardContent className="px-2 py-1 flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Map className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">
              {data.tripsCreated}
            </span>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">
              Trips Hosted
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className=" rounded-md bg-purple-50 border-purple-100 shadow-sm">
        <CardContent className="px-2 py-1 flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Ticket className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">
              {data.tripsJoined}
            </span>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">
              Trips Joined
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
