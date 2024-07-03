import { Input, Button } from '@chakra-ui/react'

interface Props {
  url: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => Promise<void>
}

export const DownloaderHeader = ({ url, onChange, onClick }: Props) => {
  return (
    <>
      <Input value={url} onChange={onChange} placeholder="Youtube Link" w="50%" maxW="md" />
      <Button onClick={onClick} w="50%" maxW="md" colorScheme="blue">
        SEARCH
      </Button>
    </>
  )
}
