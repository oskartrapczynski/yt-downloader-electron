import { Divider, CardFooter, Flex, ButtonGroup, Button } from '@chakra-ui/react'
import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
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
}

export const DownloaderCardFooter = ({
  metadata,
  formatTypeButton,
  handleClickFormatTypeButton,
  downloadOption,
  handleChangeDownloadOption
}: Props) => {
  console.log(downloadOption)
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
                    {format.replace(/[A-Z]/g, (char) => ` + ${char}`).toUpperCase()}
                  </Button>
                ))}
              </ButtonGroup>

              <SelectMusicDetails
                formatTypeButton={formatTypeButton}
                value={downloadOption}
                onChange={handleChangeDownloadOption}
              />
              <SelectVideoDetails
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
              />

              {formatTypeButton ? (
                <Button variant="solid" colorScheme="green">
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
