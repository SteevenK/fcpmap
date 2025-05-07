import { useState } from 'react'
import { MdContentCopy, MdCheck } from 'react-icons/md'

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
    setTimeout(() => setCopied(false), 2000)
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
          <MdContentCopy className="h-4 w-4" />
        )}
        {copied && (
          <span
            className="
              absolute -top-0 -right-15
              bg-gray-800 text-white text-xs rounded px-2 py-0.5
              animate-fade-in
            "
          >
            Copié !
          </span>
        )}
      </button>
    </div>
  )
}
