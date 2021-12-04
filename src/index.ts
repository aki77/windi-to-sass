#! /usr/bin/env node

import arg from 'arg'
import * as jsontosass from 'jsontosass'
import { resolve } from 'path'
import kebabCase from 'just-kebab-case'
import { writeFile } from 'fs/promises'
import { FullConfig } from 'windicss/types/interfaces'
import { Processor } from 'windicss/lib'
import { loadConfig } from 'unconfig'
import { flattenObject, normalizeObject } from './utils'

const doc = `Generate scss from windi theme.
Usage:
  windi-to-sass outputFilename
Options:
  -h, --help                   Print this help message and exit.
  -p, --paths PATHS            Theme paths. The default paths is 'colors'.
  --flatten                    Output flatten sass variables.
`

const args = arg({
  // Types
  '--help': Boolean,
  '--flatten': Boolean,
  '--paths': String,

  // Aliases
  '-h': '--help',
  '-p': '--paths',
});

if (args['--help'] || (args._.length === 0 && Object.keys(args).length === 1)) {
  console.log(doc);
  process.exit();
}

const paths = args['--paths'] ? args['--paths'].split(',') :  ['colors']
const output = resolve(args._[0])

const main = async () => {
  const { config } = await loadConfig<FullConfig>({
    sources: [
      {
        files: 'windi.config',
        // default extensions
        extensions: ['ts', 'js'],
      },
    ],
  })
  const processor = new Processor(config)

  const theme = paths.map((path) => {
    const values = processor.theme(path, {}) as any
    return [kebabCase(path), values]
  })
  const themeObject = normalizeObject(Object.fromEntries(theme))
  const sassThemeObject = args['--flatten'] ? flattenObject(themeObject, '-') : themeObject
  const sassData = jsontosass.convert(JSON.stringify(sassThemeObject))
  await writeFile(output, sassData)
}

main()
