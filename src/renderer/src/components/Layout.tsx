import { Flex } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <Flex p={3} wrap="wrap" justify="center" align="center" direction="column" gap={2}>
      {children}
    </Flex>
  )
}
