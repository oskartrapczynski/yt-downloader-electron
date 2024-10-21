interface Props {
  property: string
}

export const OptionSelect = ({ property }: Props) => {
  return <option value={property.toLowerCase()}>{`${property}`}</option>
}
