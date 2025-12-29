"use client";
import { useEffect, useRef, useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field, FieldLabel } from "@/components/ui/field";
import InputFieldError from "@/components/shared/InputFieldError";
import { addNewPlan } from "@/services/admin/subscriptionPlans";

export default function AddPlanModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(addNewPlan, null);
  console.log("state", state);
  useEffect(() => {
    if (state && !state.error && state?.success === true) {
      console.log("plan addition modal open")
      setOpen(false);
      formRef.current?.reset();
    }
  }, [state, setOpen]);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 sm:max-w-[600px]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-6 py-6">
            <div className="grid grid-cols-1 gap-4">
              <Field>
                <FieldLabel htmlFor="name">Plan Name</FieldLabel>
                <Input id="name" name="name" placeholder="e.g. Global Nomad" />
                <InputFieldError field="name" state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the benefits..."
                  className="min-h-[80px]"
                />
                <InputFieldError field="description" state={state} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="price">Price (BDT)</FieldLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="500"
                  min="0"
                  step="0.01"
                />
                <InputFieldError field="price" state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor="durationInDays">
                  Duration (Days)
                </FieldLabel>
                <Input
                  id="durationInDays"
                  name="durationInDays"
                  type="number"
                  placeholder="30"
                />
                <InputFieldError field="durationInDays" state={state} />
              </Field>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 mb-2">
                Feature Limits
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="maxTrips">Max Active Trips</FieldLabel>
                  <Input
                    id="maxTrips"
                    name="maxTrips"
                    type="number"
                    placeholder="-1 for unlimited"
                  />
                  <InputFieldError field="maxTrips" state={state} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="maxRequests">
                    Max Join Requests
                  </FieldLabel>
                  <Input
                    id="maxRequests"
                    name="maxRequests"
                    type="number"
                    placeholder="5"
                  />
                  <InputFieldError field="maxRequests" state={state} />
                </Field>
              </div>
              <Field>
                <div className="flex flex-row items-center justify-between rounded-lg border bg-white p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FieldLabel htmlFor="isOverseas">
                      Overseas Travel
                    </FieldLabel>
                    <p className="text-[10px] text-slate-500">
                      Allow international destinations
                    </p>
                  </div>
                  <Switch name="isOverseas" id="isOverseas" />
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-row items-center justify-between rounded-lg border bg-white p-3">
                  <div className="space-y-0.5">
                    <FieldLabel htmlFor="isVerifiedBadge">
                      Verified Badge
                    </FieldLabel>
                    <p className="text-[10px] text-slate-500">
                      Show Gold Crown
                    </p>
                  </div>
                  {/* Hidden input to ensure value is sent if switch is off/on logic requires it, 
                      or handle 'on' value in server action */}
                  <Switch
                    name="isVerifiedBadge"
                    id="isVerifiedBadge"
                    defaultChecked={false}
                  />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border bg-white p-3">
                  <div className="space-y-0.5">
                    <FieldLabel htmlFor="canChat">Chat Access</FieldLabel>
                    <p className="text-[10px] text-slate-500">
                      Enable messaging
                    </p>
                  </div>
                  <Switch name="canChat" id="canChat" defaultChecked={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
