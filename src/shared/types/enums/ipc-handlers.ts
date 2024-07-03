import { IPC_HANDLER } from '@shared/constants/ipc-handler'
import { ValueOf } from '../common/valueof'

export type TExportIpcHandlersEnum = ValueOf<typeof IPC_HANDLER>
