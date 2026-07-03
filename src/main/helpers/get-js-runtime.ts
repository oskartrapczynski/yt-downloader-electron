import { existsSync } from 'node:fs'
import { delimiter, join } from 'node:path'
import { getBinaryPath } from './get-binary-path'

/**
 * Modern yt-dlp requires an external JavaScript runtime to solve YouTube's "n"
 * challenges; without one, video formats fail with HTTP 403. We ship Deno — the
 * runtime yt-dlp recommends and enables by default — bundled in `resources/`, so
 * the user never has to install anything. We hand it to yt-dlp via
 * `--js-runtimes deno:<path>`.
 */

const DENO_EXE = process.platform === 'win32' ? 'deno.exe' : 'deno'

const COMMON_DENO_DIRS =
  process.platform === 'win32'
    ? [join(process.env.USERPROFILE ?? 'C:\\', '.deno', 'bin')]
    : ['/opt/homebrew/bin', '/usr/local/bin', '/usr/bin', join(process.env.HOME ?? '', '.deno/bin')]

const resolveDenoPath = (): string | null => {
  // 1. The Deno binary we bundle in resources/.
  const bundled = getBinaryPath({ target: 'deno' })
  if (existsSync(bundled)) return bundled

  // 2. Anything on PATH (dev shells, system installs).
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    if (!dir) continue
    const candidate = join(dir, DENO_EXE)
    if (existsSync(candidate)) return candidate
  }

  // 3. Common install locations (a Finder-launched app has a minimal PATH).
  for (const dir of COMMON_DENO_DIRS) {
    if (!dir) continue
    const candidate = join(dir, DENO_EXE)
    if (existsSync(candidate)) return candidate
  }

  return null
}

let cached: string | null | undefined

/**
 * yt-dlp args selecting a JavaScript runtime. Returns `--js-runtimes deno:<path>`
 * when a Deno binary is found, otherwise `--js-runtimes deno` so yt-dlp still
 * attempts its own lookup (and emits its helpful warning if none exists).
 */
export const getJsRuntimeArgs = (): string[] => {
  if (cached === undefined) cached = resolveDenoPath()
  return ['--js-runtimes', cached ? `deno:${cached}` : 'deno']
}
