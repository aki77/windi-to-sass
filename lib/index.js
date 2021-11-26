"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_1 = __importDefault(require("arg"));
const jsontosass = __importStar(require("jsontosass"));
const path_1 = require("path");
const just_kebab_case_1 = __importDefault(require("just-kebab-case"));
// eslint-disable-next-line unicorn/prefer-node-protocol
const promises_1 = require("fs/promises");
const lib_1 = require("windicss/lib");
const doc = `Generate scss from windi theme.
Usage:
  windi-to-sass outputFilename
Options:
  -h, --help            Print this help message and exit.
  -p, --paths           Theme paths. The default paths is 'colors'.
  -f, --config PATH     Set config file path..
`;
const args = (0, arg_1.default)({
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
const configFile = args['--config'] ? (0, path_1.resolve)(args['--config']) : undefined;
const paths = args['--paths'] ? args['--paths'].split(',') : ['colors'];
const output = (0, path_1.resolve)(args._[0]);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = configFile ? require(configFile) : {};
    const processor = new lib_1.Processor(config);
    const theme = paths.map((path) => {
        const values = processor.theme(path, {});
        return [(0, just_kebab_case_1.default)(path), values];
    });
    const sassData = jsontosass.convert(JSON.stringify(Object.fromEntries(theme)));
    yield (0, promises_1.writeFile)(output, sassData);
});
main();
