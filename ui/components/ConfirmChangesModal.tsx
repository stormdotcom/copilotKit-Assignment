"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ConfirmChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmChangesModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmChangesModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>

        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="translate-y-4 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-transform duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-4 opacity-0"
          >
            <Dialog.Panel className="mx-auto max-w-sm w-full rounded bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-bold mb-2">
                Confirm Changes
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 mb-4">
                Do you want to accept the changes?
              </Dialog.Description>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Reject
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
