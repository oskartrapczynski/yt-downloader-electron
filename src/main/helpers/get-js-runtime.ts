import { existsSync } from 'node:fs'
import { delimiter, join } from 'node:path'

/**
 * Modern yt-dlp requires a JavaScript runtime to solve YouTube's "n" challenges;
 * without one, video formats fail with HTTP 403. We locate a real Node.js binary
 * (Electron-as-node is rejected by yt-dlp's challenge solver) and hand it to yt-dlp
 * via `--js-runtimes node:<path>`.
 */

const NODE_EXE = process.platform === 'win32' ? 'node.exe' : 'node'

const COMMON_NODE_DIRS =
  process.platform === 'win32'
    ? [
        join(process.env.ProgramFiles ?? 'C:\\Program Files', 'nodejs'),
        join(process.env['ProgramFiles(x86)'] ?? 'C:\\Program Files (x86)', 'nodejs')
      ]
    : ['/opt/homebrew/bin', '/usr/local/bin', '/usr/bin']

const resolveNodePath = (): string | null => {
  // 1. Anything on PATH (covers dev shells, nvm, system installs).
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    if (!dir) continue
    const candidate = join(dir, NODE_EXE)
    if (existsSync(candidate)) return candidate
  }
  // 2. Common install locations (a Finder-launched app has a minimal PATH).
  for (const dir of COMMON_NODE_DIRS) {
    const candidate = join(dir, NODE_EXE)
    if (existsSync(candidate)) return candidate
  }
  return null
}

let cached: string | null | undefined

/**
 * yt-dlp args selecting a JavaScript runtime. Returns `--js-runtimes node:<path>`
 * when a Node binary is found, otherwise `--js-runtimes node` so yt-dlp still
 * attempts its own lookup (and emits its helpful warning if none exists).
 */
export const getJsRuntimeArgs = (): string[] => {
  if (cached === undefined) cached = resolveNodePath()
  return ['--js-runtimes', cached ? `node:${cached}` : 'node']
}
