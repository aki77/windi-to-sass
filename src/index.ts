import arg from 'arg'
import * as jsontosass from 'jsontosass'
import { resolve } from 'path'
import kebabCase from 'just-kebab-case'
// eslint-disable-next-line unicorn/prefer-node-protocol
import { writeFile } from 'fs/promises'
import { Processor } from 'windicss/lib'
import type { Config } from 'windicss/types/interfaces'

const doc = `Generate scss from windi theme.
Usage:
  windi-to-sass outputFilename
Options:
  -h, --help            Print this help message and exit.
  -p, --paths           Theme paths. The default paths is 'colors'.
  -f, --config PATH     Set config file path..
`

const args = arg({
  // Types
  '--help': Boolean,
  '--paths': String,
  '--config': String,

  // Aliases
  '-h': '--help',
  '-p': '--paths',
  '-f': '--config',
});

if (args['--help'] || (args._.length === 0 && Object.keys(args).length === 1)) {
  console.log(doc);
  process.exit();
}

const configFile = args['--config'] ? resolve(args['--config']) : undefined;
const paths = args['--paths'] ? args['--paths'].split(',') :  ['colors']
const output = resolve(args._[0])

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = configFile ? require(configFile) as Config : {}
  const processor = new Processor(config)

  const theme = paths.map((path) => {
    const values = processor.theme(path, {}) as any
    return [kebabCase(path), values]
  })
  const sassData = jsontosass.convert(JSON.stringify(Object.fromEntries(theme)))
  await writeFile(output, sassData)
}

main()
