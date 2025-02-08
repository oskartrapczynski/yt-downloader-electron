import { Divider, CardFooter, Flex, ButtonGroup, Button, useToast } from '@chakra-ui/react'
import { convertToCapitalCase } from '@renderer/helpers/convert-to-capitalcase'
import { videoTitleToFilename } from '@renderer/helpers/video-title-to-filename'
import { DOWNLOAD_OPTION } from '@shared/constants/download-option'
import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
import { IPC_HANDLER } from '@shared/constants/ipc-handler'
import { TDownloadOptionEnum } from '@shared/types/enums/download-option'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { TMusicFormatEnum } from '@shared/types/enums/music-format'
import { TMusicQualityEnum } from '@shared/types/enums/music-quality'
import { TVideoFormatEnum } from '@shared/types/enums/video-format'
import { TVideoResolutionEnum } from '@shared/types/enums/video-resolution'
import { TDownloadOption } from '@shared/types/types/download-option'
import { TMetaData } from '@shared/types/types/metadata'
import { useEffect, useState } from 'react'
import { SelectDetails } from '@renderer/components/Select/SelectDetails'

interface Props {
  metadata: TMetaData | null
  formatTypeButton: TFormatTypeButtonEnum | null
  handleClickFormatTypeButton: (btnText: TFormatTypeButtonEnum) => void
  downloadOption: TDownloadOption | null
  handleChangeDownloadOption: (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: TDownloadOptionEnum
  ) => void
  url: string
}

export const DownloaderCardFooter = ({
  metadata,
  formatTypeButton,
  handleClickFormatTypeButton,
  downloadOption,
  url
}: Props) => {
  const [isValidated, setIsValidated] = useState(false)
  const [musicFormat, setMusicFormat] = useState<TMusicFormatEnum | null>(null)
  const [musicQuality, setMusicQuality] = useState<TMusicQualityEnum | null>(null)
  const [videoFormat, setVideoFormat] = useState<TVideoFormatEnum | null>(null)
  const [videoResolution, setVideoResolution] = useState<TVideoResolutionEnum | null>(null)
  const toast = useToast()
  const { DOWNLOAD_DATA } = IPC_HANDLER

  const validateSettingSelects = () => {
    switch (formatTypeButton) {
      case FORMAT_TYPE_BUTTON.MUSIC:
        return Boolean(musicFormat && musicQuality)

      case FORMAT_TYPE_BUTTON.VIDEO:
        return Boolean(downloadOption?.videoFormat && downloadOption?.videoResolution)

      case FORMAT_TYPE_BUTTON.VIDEO_MUSIC:
        return Boolean(
          downloadOption?.musicFormat &&
            downloadOption?.musicQuality &&
            downloadOption?.videoFormat &&
            downloadOption?.videoResolution
        )
      default:
        return false
    }
  }

  const handleDownloadClick = async () => {
    if (!isValidated) {
      toast({
        title: 'Missing details',
        description: 'Please select all details',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }
    const fileName = videoTitleToFilename(metadata?.title)

    const downloadOption: TDownloadOption = {
      [DOWNLOAD_OPTION.VIDEO_FORMAT]: videoFormat ?? undefined,
      [DOWNLOAD_OPTION.MUSIC_FORMAT]: musicFormat ?? undefined,
      [DOWNLOAD_OPTION.MUSIC_QUALITY]: musicQuality ?? undefined,
      [DOWNLOAD_OPTION.VIDEO_RESOLUTION]: videoResolution ?? undefined
    }

    await window.electron.ipcRenderer.invoke(
      DOWNLOAD_DATA,
      url,
      fileName,
      downloadOption,
      formatTypeButton
    )
  }

  useEffect(() => {
    const isValidatedSelects = validateSettingSelects()
    setIsValidated(isValidatedSelects)
  }, [musicFormat, musicQuality])

  return (
    <>
      {metadata && (
        <>
          <Divider />
          <CardFooter justifyContent="center">
            <Flex wrap="wrap" gap={2}>
              <ButtonGroup>
                {Object.values(FORMAT_TYPE_BUTTON).map((format) => (
                  <Button
                    key={format}
                    variant={formatTypeButton === format ? 'solid' : 'outline'}
                    colorScheme="orange"
                    onClick={() => handleClickFormatTypeButton(format)}
                  >
                    {convertToCapitalCase(format)}
                  </Button>
                ))}
              </ButtonGroup>

              <SelectDetails
                formatTypeButton={formatTypeButton}
                musicFormat={musicFormat}
                setMusicFormat={setMusicFormat}
                musicQuality={musicQuality}
                setMusicQuality={setMusicQuality}
                videoFormat={videoFormat}
                setVideoFormat={setVideoFormat}
                videoResolution={videoResolution}
                setVideoResolution={setVideoResolution}
              />

              {formatTypeButton ? (
                <Button
                  variant={isValidated ? 'solid' : 'outline'}
                  colorScheme={isValidated ? 'green' : 'orange'}
                  onClick={handleDownloadClick}
                  disabled={true}
                >
                  DOWNLOAD
                </Button>
              ) : null}
            </Flex>
          </CardFooter>
        </>
      )}
    </>
  )
}
