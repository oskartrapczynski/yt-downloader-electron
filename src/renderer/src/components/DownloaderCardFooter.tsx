import { Divider, CardFooter, Flex, ButtonGroup, Button } from '@chakra-ui/react'
import { convertToCapitalCase } from '@renderer/helpers/convert-to-capitalcase'
import { videoTitleToFilename } from '@renderer/helpers/video-title-to-filename'
import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
import { IPC_HANDLER } from '@shared/constants/ipc-handler'
import { TDownloadOptionEnum } from '@shared/types/enums/download-option'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { TDownloadOption } from '@shared/types/types/download-option'
import { TMetaData } from '@shared/types/types/metadata'
import { SelectMusicDetails } from './SelectMusicDetails'
import { SelectVideoDetails } from './SelectVideoDetails'
import { SelectVideoMusicDetails } from './SelectVideoMusicDetails'

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
  handleChangeDownloadOption,
  url
}: Props) => {
  const { DOWNLOAD_DATA } = IPC_HANDLER

  const validateSettingSelects = () => {
    switch (formatTypeButton) {
      case FORMAT_TYPE_BUTTON.MUSIC:
        return Boolean(downloadOption?.musicFormat && downloadOption?.musicQuality)

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
    const isValidated = validateSettingSelects()
    if (!isValidated) return
    const fileName = videoTitleToFilename(metadata?.title)

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

              <SelectMusicDetails
                formatTypeButton={formatTypeButton}
                value={downloadOption}
                onChange={handleChangeDownloadOption}
              />
              {/* <SelectVideoDetails
                formatTypeButton={formatTypeButton}
                videoResolutions={metadata.videoResolution}
                value={downloadOption}
                onChange={handleChangeDownloadOption}
              />
              <SelectVideoMusicDetails
                formatTypeButton={formatTypeButton}
                videoResolutions={metadata.videoResolution}
                value={downloadOption}
                onChange={handleChangeDownloadOption}
              /> */}

              {formatTypeButton ? (
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
