import PaymentHandler from "@/components/modules/user/payment/PaymentHandler";
import { Suspense } from "react";

export default async function PaymentPage({
  params,
  searchParams,
}: {
  params: { status: string };
  searchParams: Promise<{
    [key: string]: string | string[] | undefined | number;
  }>;
}) {
  const { status } = await params;
  const query = await searchParams;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentHandler
          status={status}
          amount={Number(query?.amount)}
          tnxId={query?.transactionId as string}
        />
      </Suspense>
    </div>
  );
}
