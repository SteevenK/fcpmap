import React from 'react'

type SelectionMode = 'polygon' | 'individual'

interface SelectionModeSwitchProps {
  selectionMode: SelectionMode
  toggleSelectionMode: () => void
}

const SelectionModeSwitch: React.FC<SelectionModeSwitchProps> = ({
  selectionMode,
  toggleSelectionMode,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow">
      <label className="flex items-center space-x-2">
        <span>Mode sélection :</span>
        <span className="text-sm">
          {selectionMode === 'polygon'
            ? 'Polygon (4 coordonnées)'
            : 'Coordonnée individuelle'}
        </span>
        <input
          type="checkbox"
          checked={selectionMode === 'polygon'}
          onChange={toggleSelectionMode}
          className="ml-2"
        />
      </label>
    </div>
  )
}

export default SelectionModeSwitch
