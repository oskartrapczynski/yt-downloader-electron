import { Select } from '@chakra-ui/react'
import { TDownloadOptionEnum } from '@shared/types/enums/download-option'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { NoContent } from './NoContent'
import { OptionSelect } from './OptionSelect'

interface Props {
  formatTypeButton: TFormatTypeButtonEnum | null
  formatyTypeButtonTarget: TFormatTypeButtonEnum
  placeholder?: string
  options
  show: 'keys' | 'values'
  value?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>, field: TDownloadOptionEnum) => void
  field: TDownloadOptionEnum
  conditionForRender?: boolean
}

export const SelectDetails = ({
  formatTypeButton,
  formatyTypeButtonTarget,
  placeholder,
  options,
  show = 'keys',
  value,
  onChange,
  field,
  conditionForRender
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e, field)
  }
  if (conditionForRender === false) return null
  if (formatTypeButton !== formatyTypeButtonTarget) return null
  if (options === null || !Object.keys(options)?.length) return <NoContent />
  return (
    <Select placeholder={placeholder} size="md" value={value} onChange={handleChange}>
      {Object[show](options).map((option) => (
        <OptionSelect key={`${formatTypeButton}-${option}`} property={option} />
      ))}
    </Select>
  )
}
