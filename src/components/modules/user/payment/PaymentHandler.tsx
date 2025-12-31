"use client";

import { useState } from "react";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFail";
import { useRouter } from "next/navigation";

export default function PaymentHandler({
  status,
  amount,
  tnxId,
}: {
  status: string;
  amount: number;
  tnxId: string;
}) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  if (status === "success") {
    return (
      <PaymentSuccess
        amount={Number(amount)}
        isOpen={open}
        onClose={() => {
          setOpen(false);
          router.push("/dashboard");
        }}
        transactionId={tnxId}
      />
    );
  }

  return (
    <PaymentFailed
      amount={Number(amount)}
      isOpen={open}
      onClose={() => {
        setOpen(false);
        router.push("/dashboard");
      }}
      transactionId={tnxId}
    />
  );
}
