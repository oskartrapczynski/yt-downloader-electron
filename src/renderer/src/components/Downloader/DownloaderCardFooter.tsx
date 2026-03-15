import { Divider, CardFooter, Flex, ButtonGroup, Button, useToast } from '@chakra-ui/react'
import { convertToCapitalCase } from '@renderer/helpers/convert-to-capitalcase'
import { videoTitleToFilename } from '@renderer/helpers/video-title-to-filename'
import { DOWNLOAD_OPTION } from '@shared/constants/download-option'
import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
import { IPC_HANDLER } from '@shared/constants/ipc-handler'
import { TDownloadOptionEnum } from '@shared/types/enums/download-option'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { TDownloadOption } from '@shared/types/types/download-option'
import { TMetaData } from '@shared/types/types/metadata'
import { SelectDetails } from '@renderer/components/Select/SelectDetails'

interface Props {
  metadata: TMetaData | null
  formatTypeButton: TFormatTypeButtonEnum | null
  handleClickFormatTypeButton: (btnText: TFormatTypeButtonEnum) => void
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
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
  setDownloadOption,
  url
}: Props) => {
  const toast = useToast()
  const { DOWNLOAD_DATA } = IPC_HANDLER
  const { musicFormat, musicQuality, videoFormat, videoResolution } = downloadOption

  const isTabDisabled =
    formatTypeButton === FORMAT_TYPE_BUTTON.VIDEO_MUSIC ||
    formatTypeButton === FORMAT_TYPE_BUTTON.VIDEO

  const validateSettingSelects = () => {
    switch (formatTypeButton) {
      case FORMAT_TYPE_BUTTON.MUSIC:
        return Boolean(musicFormat && musicQuality)

      case FORMAT_TYPE_BUTTON.VIDEO:
        return Boolean(videoFormat && videoResolution)

      case FORMAT_TYPE_BUTTON.VIDEO_MUSIC:
        return Boolean(musicFormat && musicQuality && videoFormat && videoResolution)
      default:
        return false
    }
  }

  const handleDownloadClick = async () => {
    const isValidatedSelects = validateSettingSelects()
    if (!isValidatedSelects) {
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
      [DOWNLOAD_OPTION.VIDEO_FORMAT]: videoFormat,
      [DOWNLOAD_OPTION.MUSIC_FORMAT]: musicFormat,
      [DOWNLOAD_OPTION.MUSIC_QUALITY]: musicQuality,
      [DOWNLOAD_OPTION.VIDEO_RESOLUTION]: videoResolution
    }

    await window.electron.ipcRenderer.invoke(
      DOWNLOAD_DATA,
      url,
      fileName,
      downloadOption,
      formatTypeButton
    )
  }

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
                downloadOption={downloadOption}
                setDownloadOption={setDownloadOption}
              />

              {formatTypeButton && !isTabDisabled ? (
                <Button variant="solid" colorScheme="green" onClick={handleDownloadClick}>
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
