import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'

interface Props {
  isError: boolean | null
  errorMessage: string | null
}

export const DownloaderError = ({ isError, errorMessage }: Props) => {
  return isError === true ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{errorMessage ? errorMessage : 'No Error Message'}</AlertTitle>
    </Alert>
  ) : null
}
