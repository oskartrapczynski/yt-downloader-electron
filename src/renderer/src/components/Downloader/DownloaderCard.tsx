import { Card, CardBody, Stack, Image, Text, Skeleton } from '@chakra-ui/react'
import { TMetaData } from '@shared/types/types/metadata'
import { useState } from 'react'
import noImage from '@renderer/assets/no-image.jpg'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { DownloaderCardFooter } from './DownloaderCardFooter'
import { TDownloadOptionEnum } from '@shared/types/enums/download-option'
import { TDownloadOption } from '@shared/types/types/download-option'
import { INIT_DOWNLOAD_OPTION } from '@shared/constants/init-download-option'
import { TDownloaderStateEnum } from '@shared/types/enums/downloader-state'
import { DOWNLOADER_STATE } from '@shared/constants/downloader-state'

interface Props {
  downloaderState: TDownloaderStateEnum
  metadata: TMetaData | null
  url: string
}

export const DownloaderCard = ({ downloaderState, metadata, url }: Props) => {
  const [formatTypeButton, setFormatTypeButton] = useState<TFormatTypeButtonEnum | null>(null)

  const [downloadOption, setDownloadOption] = useState<TDownloadOption>(INIT_DOWNLOAD_OPTION)

  const { authorName, thumbnailUrl, title, isError } = metadata || {}

  const shouldNotRender = downloaderState === DOWNLOADER_STATE.NULL
  const hasError = isError === true

  if (shouldNotRender || hasError) return null

  const isLoading = downloaderState === DOWNLOADER_STATE.LOADING

  const handleClickFormatTypeButton = (btnText: TFormatTypeButtonEnum) => {
    setFormatTypeButton(btnText)
    setDownloadOption(INIT_DOWNLOAD_OPTION)
  }

  const handleChangeDownloadOption = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: TDownloadOptionEnum
  ) => {
    setDownloadOption((prev) => ({
      ...prev,
      [field]: e.target.value ? e.target.value : undefined
    }))
  }

  return (
    <Card maxW="md">
      <CardBody>
        <Skeleton isLoaded={!isLoading}>
          <Image src={thumbnailUrl ? thumbnailUrl : noImage} alt="atwork" borderRadius="lg" />
        </Skeleton>
        <Stack mt="6" spacing="3">
          <Skeleton isLoaded={!isLoading}>
            <Text>
              <Text as="b">Channel: </Text>
              {authorName}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Text>
              <Text as="b">Title: </Text>
              {title ? title : '-'}
            </Text>
          </Skeleton>
        </Stack>
      </CardBody>
      {!isLoading ? (
        <DownloaderCardFooter
          metadata={metadata}
          formatTypeButton={formatTypeButton}
          handleClickFormatTypeButton={handleClickFormatTypeButton}
          handleChangeDownloadOption={handleChangeDownloadOption}
          downloadOption={downloadOption}
          setDownloadOption={setDownloadOption}
          url={url}
        />
      ) : null}
    </Card>
  )
}
