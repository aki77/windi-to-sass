# windi-to-sass

## Usage

```
npx @aki77/windi-to-sass output.scss -f windi.config.ts -p colors,width,space
```

## Cli Options

```
> windi-to-sass --help

Generate scss from windi theme.
Usage:
  windi-to-sass outputFilename
Options:
  -h, --help                   Print this help message and exit.
  -p, --paths PATHS            Theme paths. The default paths is 'colors'.
  -f, --config CONFIG_PATH     Set config file path.
  --flatten                    Output flatten sass variables.
```

## Example

```scss
// default option

$colors: (
    transparent: transparent,
    current: currentColor,
    light: (
        50: #fdfdfd,
        100: #fcfcfc,
        200: #fafafa,
        300: #f8f9fa,
        400: #f6f6f6,
        500: #f2f2f2,
        600: #f1f3f5,
        700: #e9ecef,
        800: #dee2e6,
        900: #dde1e3
    ),
);

// with --flatten option
$colors-transparent: transparent;
$colors-current: currentColor;
$colors-light-50: #fdfdfd;
$colors-light-100: #fcfcfc;
$colors-light-200: #fafafa;
$colors-light-300: #f8f9fa;
$colors-light-400: #f6f6f6;
$colors-light-500: #f2f2f2;
$colors-light-600: #f1f3f5;
$colors-light-700: #e9ecef;
$colors-light-800: #dee2e6;
$colors-light-900: #dde1e3;
```
