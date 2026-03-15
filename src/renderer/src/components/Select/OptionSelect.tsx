interface Props {
  property: string
  disabled?: boolean
}

export const OptionSelect = ({ property, disabled }: Props) => {
  return <option value={property.toLowerCase()} disabled={disabled}>{`${property}`}</option>
}
