interface Props {
  property: string
}

export const OptionSelect = ({ property }: Props) => {
  return <option>{`${property}`}</option>
}
