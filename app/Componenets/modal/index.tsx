import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ReactNode, createElement } from "react";

interface ModalProps extends JSX.IntrinsicAttributes {
  open?: boolean;
  children?: string | ReactNode;
  close: (value: boolean) => void;
}
const MyModal = ({ children, ...props }: ModalProps) => {
  return (
    <>
      <Transition appear show={props.open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div>{children}</div>
        </Dialog>
      </Transition>
    </>
  );
};
export default MyModal;