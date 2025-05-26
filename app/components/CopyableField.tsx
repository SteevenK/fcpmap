import { useState } from 'react'
import { MdContentCopy, MdCheck } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

type CopyableFieldProps = {
  label: string
  value: string
  colorClass?: string
}

export const CopyableField: React.FC<CopyableFieldProps> = ({
  label,
  value,
  colorClass = 'text-indigo-500',
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative flex items-center space-x-2 py-1">
      <span className="font-bold">{label} :</span>
      <span className={colorClass}>{value}</span>
      <button
        onClick={handleCopy}
        aria-label={`Copier ${label}`}
        className="
          relative flex items-center justify-center p-1 rounded
          hover:bg-gray-100
          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300
          transition
        "
      >
        {copied ? (
          <MdCheck className="h-4 w-4 text-green-500" />
        ) : (
          <MdContentCopy className="h-4 w-4 cursor-pointer" />
        )}

        {/* Animated tooltip */}
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="
                absolute -top-0 -right-15
                bg-gray-800 text-white text-xs rounded px-2 py-0.5
                pointer-events-none
              "
            >
              Copié!
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
