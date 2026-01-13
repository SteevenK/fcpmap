import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

interface ModernModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModernModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(isOpen)

  // Synchronise l'état interne avec isOpen
  React.useEffect(() => {
    if (isOpen) {
      setInternalOpen(true)
    }
  }, [isOpen])

  const handleClose = () => {
    // Laisser l'animation se terminer avant de fermer complètement la modal
    setInternalOpen(false)
    setTimeout(onClose, 200) // 200ms doit correspondre à la durée de votre animation de sortie
  }

  return (
    <Transition appear show={internalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <div className="min-h-screen px-4 text-center">
          {/* Overlay */}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10"
              onClick={handleClose}
            />
          </TransitionChild>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* Panel */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform
                     bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl z-20 text-white"
            >
              <h3
                id="dialog-title"
                className="text-xl font-bold leading-6 text-white mb-4"
              >
                {title}
              </h3>
              <div className="mt-2 text-gray-300 space-y-2">{children}</div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white
                         bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 cursor-pointer shadow-lg shadow-indigo-500/20"
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
  )
}

export default Modal
