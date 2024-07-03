import { Card, CardBody, Stack, Image, Text, Skeleton } from '@chakra-ui/react'

import { TMetaData } from '@shared/types/types/metadata'
import { useState } from 'react'

import noImage from '../assets/no-image.jpg'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { DownloaderCardFooter } from './DownloaderCardFooter'
import { TDownloadOptionEnum } from '@shared/types/enums/download-option'
import { TDownloadOption } from '@shared/types/types/download-option'
import { INIT_DOWNLOAD_OPTION } from '@shared/constants/init-download-option'

interface Props {
  metadata: TMetaData | null
  loading: boolean
}

export const DownloaderCard = ({ metadata, loading }: Props) => {
  const [formatTypeButton, setFormatTypeButton] = useState<TFormatTypeButtonEnum | null>(null)

  const [downloadOption, setDownloadOption] = useState<TDownloadOption>(INIT_DOWNLOAD_OPTION)

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
        <Skeleton isLoaded={!loading}>
          <Image
            src={metadata?.thumbnailUrl ? metadata.thumbnailUrl : noImage}
            alt="atwork"
            borderRadius="lg"
          />
        </Skeleton>

        <Stack mt="6" spacing="3">
          <Skeleton isLoaded={!loading}>
            <Text>
              <Text as="b">Channel: </Text>
              {metadata?.author ? metadata.author : '-'}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Text>
              <Text as="b">Title: </Text>
              {metadata?.title ? metadata.title : '-'}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Text>
              <Text as="b">Views: </Text>
              {metadata?.viewCount ? metadata.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '?'}
            </Text>
          </Skeleton>
        </Stack>
      </CardBody>
      <DownloaderCardFooter
        metadata={metadata}
        formatTypeButton={formatTypeButton}
        handleClickFormatTypeButton={handleClickFormatTypeButton}
        downloadOption={downloadOption}
        handleChangeDownloadOption={handleChangeDownloadOption}
      />
    </Card>
  )
}
