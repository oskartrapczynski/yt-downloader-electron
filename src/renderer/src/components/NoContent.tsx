import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'

export const NoContent = () => {
  return (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle>No content</AlertTitle>
    </Alert>
  )
}
