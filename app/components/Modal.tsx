import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

interface ModernModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModernModalProps> = ({ isOpen, onClose, title, children }) => {
  const [internalOpen, setInternalOpen] = useState(isOpen);

  // Synchronise l'état interne avec isOpen
  React.useEffect(() => {
    if (isOpen) {
      setInternalOpen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    // Laisser l'animation se terminer avant de fermer complètement la modal
    setInternalOpen(false);
    setTimeout(onClose, 200); // 200ms doit correspondre à la durée de votre animation de sortie
  };

  return (
    <Transition appear show={internalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <div className="min-h-screen px-4 text-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/30"
              onClick={handleClose}
            />
          </TransitionChild>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <h3 id="dialog-title" className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <div className="mt-2">{children}</div>
              <div className="mt-4">
                <button
                  type="button"
                  className="cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={handleClose}
                >
                  Fermer
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
