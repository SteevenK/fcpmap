import SchematicMap from '@/app/components/SchematicMap'
import {
  stores0to20,
  stores21to40,
  stores41to60,
  stores61to80,
  stores81to100,
} from '@/app/components/stores'

export default function Home() {
  return (
    <SchematicMap
      stores={[
        ...stores0to20,
        ...stores21to40,
        ...stores41to60,
        ...stores61to80,
        ...stores81to100,
      ]}
    />
  )
}
