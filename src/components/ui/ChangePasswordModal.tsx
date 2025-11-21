"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Heading1 } from "./Header1";
import Input from "./Input";
import Button from "./Button";

// import { useChangePassword } from "@/hooks/useChangePassword"; // <-- if you have an API hook

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface IChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export default function ChangePasswordModal({ open, onClose }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IChangePasswordPayload>();

  // If you have a react-query mutation hook, use it here
  // const { mutate, isPending } = useChangePassword(setError);

  const onSubmit = (data: IChangePasswordPayload) => {
    const { current_password, new_password } = data;

    // Example if using a mutation hook:
    /*
    mutate(
      { current_password, new_password },
      {
        onError: (error: any) => {
          toast.error(error?.message || "Something went wrong");
        },
        onSuccess: () => {
          toast.success("Password changed successfully!");
          reset();
          onClose();
        },
      }
    );
    */

    // TEMP: remove this block when you wire real API
    toast.success("Password changed successfully! (demo)");
    reset();
    onClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        {/* Centered Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <DialogPanel className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-5">
                <Heading1
                  className="text-[16px] text-black font-semibold"
                  title="Change Password"
                />
                <button
                  onClick={onClose}
                  className="text-sm cursor-pointer underline font-semibold text-gray-700"
                >
                  Go Back
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  error={errors.current_password?.message}
                  {...register("current_password", {
                    required: "Current password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <Input
                  label="New Password"
                  type="password"
                  error={errors.new_password?.message}
                  {...register("new_password", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <div className="flex gap-3 mt-5">
                  <Button
                    type="submit"
                    // loading={isPending} // uncomment if using mutation
                  >
                    Change Password
                  </Button>

                  <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
