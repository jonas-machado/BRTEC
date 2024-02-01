"use client";

import React, { useState, useRef, Fragment, Children } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User } from "@prisma/client";

interface ModalProp {
  isOpen?: boolean;
  currentUser?: User | null;
  make?: any;
  cancel?: any;
  children: React.ReactNode;
}

const Modal = ({ isOpen, currentUser, make, cancel, children }: ModalProp) => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <div className=" ">
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30 "
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity " />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto scrollbar-none">
            <div className="flex w-full min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0  ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="transform rounded-lg backdrop-blur bg-black bg-opacity-70 text-left shadow-xl transition-all sm:my-8 w-auto pb-6">
                  <div className="px-6 py-6 sm:px-6">
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={cancel}
                        className="absolute top-3 right-2.5 cursor-pointer z-50 text-gray-400 bg-transparent  hover:bg-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center outline-none"
                        data-modal-hide="authentication-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Modal;
