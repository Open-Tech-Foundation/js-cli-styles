<img align="left" src="https://open-tech-foundation.pages.dev/img/Logo.svg" width="50" height="50">

&nbsp;[OPEN TECH FOUNDATION](https://open-tech-foundation.pages.dev/)

<div align="center">

# CLI Styles

[![Build](https://github.com/open-tech-foundation/js-cli-styles/actions/workflows/build.yml/badge.svg)](https://github.com/open-tech-foundation/js-cli-styles/actions/workflows/build.yml)

</div>

> Style your CLI text using [ANSI](https://en.wikipedia.org/wiki/ANSI_escape_code) escape sequences.

<div align="center">

**Try it online at [https://node-repl.pages.dev](https://node-repl.pages.dev/)**

</div>

---

🚀 [@opentf/std](https://js-std.pages.dev/) - An Extensive JavaScript Standard Library. Please review and give feedback.

---

## Features

- 24-Bit colors only (True Color)

- Nested styles

- Auto detects CLI color support

- Supports RGB & Hex color modes

- Respects [NO_COLOR](https://no-color.org/) & [FORCE_COLOR](https://nodejs.org/api/cli.html#force_color1-2-3)

## Supported Terminals (Popular)

✔️ GNOME Terminal

✔️ Konsole

✔️ xfce4-terminal

✔️ MATE Terminal

✔️ iTerm2

✔️ VS Code

✔️ Tabby

✔️ Hyper

✔️ Alacritty

✔️ Contour

✔️ kitty

✔️ WezTerm

✔️ Windows Terminal

❌ Terminal.app

\*Missing your favorite terminal emulators here? Please give a PR or file an issue in [Github](https://github.com/Open-Tech-Foundation/js-cli-styles/issues/new).

## Installation

```shell
npm install @opentf/cli-styles
```

```shell
yarn add @opentf/cli-styles
```

```shell
pnpm add @opentf/cli-styles
```

```shell
bun add @opentf/cli-styles
```

## Syntax

```ts
style(str: string, options?: { color: boolean }): string;
```

## Usage

```ts
import { style } from '@opentf/cli-styles';

const out = style('$key[.key...]{Text}');
console.log(out);
```

## Examples

Using foreground color

```ts
style(
  '🍊 - An $o{orange} is a fruit of various citrus species in the family Rutaceae.'
);
```

![](assets/orange.png)

Using multiple colors

```ts
style(
  '$bgy.bl{The $r.bol{R}$g.bol{G}$b.bol{B} color model is an additive color model in which the $r.bol{red}, $g.bol{green} and $b.bol{blue} primary colors of light are added together in various ways to reproduce a broad array of colors.}'
);
```

![](assets/rgb.png)

Nested colors

```ts
style(
  "$bgbl.b{THE QUICK $g{BROWN $r.bol{CAT} JUMPED} OVER THE LAZY $r.bol{DOG}'S BACK}"
);
```

![](assets/nested.png)

Composing different styles

```ts
style('$bol.w.bgg{ PASS }');
```

![](assets/pass.png)

Inverse colors

```ts
style('$inv.r.bgw.bol{ FAILED }');
```

![](assets/failed.png)

Normal vs Bold vs Dim text

```ts
style('Normal text | $bol{Bold text} | $dim{Dimmed text}');
```

![](assets/fontweight.png)

Italic fonts

```ts
style(
  '$ita.fuchsia.bol.bgw{"This poem is endless,\n the odds against us are endless,\n our chances of being alive together statistically nonexistent;\n still we have made it"}'
);
```

![](assets/italic.png)

Underlined texts

```ts
style('$und{Straight underline}');
style('$und{Straight $nou{(No underline here)}  underline}');
style('$dbu{Double underline}');
style('$cru{Curly underline}');
style('$dou{Dotted underline}');
style('$dau{Dashed underline}');
style('$und.ug{Straight underline colored}');
style('$dbu.uy{Double underline colored}');
style('$cru.ur{Curly underline colored}');
style('$dou.ub{Dotted underline colored}');
style('$dau.uo{Dashed underline colored}');
style('$und.urgb(100,200,255){Straight underline RGB colored}');
style('$und.ub{Straight $ruc{underline reset} colored}');
```

![Underline Demo](assets/Underline-Demo.png)

\*Output from VS Code.

Strikethrough text

```ts
style('Price: $str.r{\\$75.00} $g{\\$50.00}');
```

![](assets/strike.png)

Code Highlighting:

```js
import { style } from '@opentf/cli-styles';
import hljs from 'highlight.js';
import { decode } from 'html-entities';

function highlight(code) {
  let html = hljs.highlight(code, {
    language: 'js',
  }).value;
  html = html.replaceAll('<span class="hljs-keyword">', '$fuchsia{');
  html = html.replaceAll('<span class="hljs-variable language_">', '$b{');
  html = html.replaceAll('<span class="hljs-title function_">', '$lime{');
  html = html.replaceAll('<span class="hljs-string">', '$y{');
  html = html.replaceAll('<span class="hljs-params"></span>', '');
  html = html.replaceAll('<span class="hljs-comment">', '$gr.dim{');
  html = html.replaceAll('</span>', '}');
  html = decode(html);
  return style(html);
}

const code = `
// Comment
function greet() {
  console.log('Hello World!');
}
`;

console.log(highlight(code));
```

![](assets/highlight_code.png)

Using Template Literals:

```ts
const cpu = 90;
const ram = 40;
const disk = 70;

const getColor = (n) => (n <= 50 ? 'g' : n > 50 && n <= 70 ? 'y' : 'r');

style(`
 CPU: $${getColor(cpu)}{${cpu}%}
 RAM: $${getColor(ram)}{${ram}%}
DISK: $${getColor(disk)}{${disk}%}
`);
```

![](assets/template_literal.png)

Escape characters:

Use double back slashes to escape a character in the string.

```ts
style(
  `<$hex(#39CCCC){input} name=$y{"price"} value=$y{"\\$\\{ Cost + Tax \\}.00"} />`
);
```

![](assets/escape.png)

Blinking Text:

```ts
style('$g.bol{SALE! -} $blk.r.bol{50% OFFER}');
```

![](assets/sale.gif)

## Color Keys

| Key                    | Description                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| r                      | Red - rgb(255,65,54)                                                                                                                                                |
| g                      | Green - rgb(46,204,64)                                                                                                                                              |
| b                      | Blue - rgb(0,116,217)                                                                                                                                               |
| o                      | Orange - rgb(255,133,27)                                                                                                                                            |
| y                      | Yellow - rgb(255,220,0)                                                                                                                                             |
| w                      | White - rgb(255,255,255)                                                                                                                                            |
| m                      | Magenta - rgb(255,105,193)                                                                                                                                          |
| c                      | Cyan - rgb(154, 236, 254)                                                                                                                                           |
| n                      | Navy - rgb(0,31,63)                                                                                                                                                 |
| a                      | Aqua - rgb(127,219,255)                                                                                                                                             |
| t                      | Teal - rgb(57,204,204)                                                                                                                                              |
| p                      | Purple - rgb(177,13,201)                                                                                                                                            |
| f                      | Fuchsia - rgb(240,18,190)                                                                                                                                           |
| s                      | Silver - rgb(221,221,221)                                                                                                                                           |
| ma                     | Maroon - rgb(133,20,75)                                                                                                                                             |
| ol                     | Olive - rgb(61,153,112)                                                                                                                                             |
| li                     | Lime - rgb(1,255,112)                                                                                                                                               |
| bl                     | Black - rgb(17,17,17)                                                                                                                                               |
| gr                     | Grey - rgb(170,170,170)                                                                                                                                             |
| pi                     | Pink - rgb(255, 191, 203)                                                                                                                                           |
| rgb(red, green, blue)  | The RGB foreground colors, Eg: rgb(255,0,0) for red color.                                                                                                          |
| urgb(red, green, blue) | The RGB underlined colors, Eg: urgb(255, 255, 0) for yellow underlined color.                                                                                       |
| hex(#------)           | The 6-digit Hex colors, Eg: hex(#00ff00) for green color.                                                                                                           |
| bg\*                   | The background colors can be applied with prefix `bg` to any color keys.<br> Eg: <br/>bgw for white bg<br/>bgrgb(0,0,0) for black bg<br/>bghex(#0000FF) for blue bg |
| u\*                    | The underline colors.                                                                                                                                               |

## Modifier Keys

| Key | Description                            |
| --- | -------------------------------------- |
| res | Reset all attributes to normal.        |
| nor | Normal intensity Neither bold nor dim. |
| bol | Bold or increased intensity text.      |
| dim | Dimmed or decreased intensity text.    |
| ita | Italic text.                           |
| inv | Swap foreground and background colors. |
| noi | Not inversed.                          |
| str | Strikethrough text.                    |
| nos | Not Strikethrough text.                |
| hid | Hidden text.                           |
| vis | Visible text.                          |
| und | Straight underline text.               |
| nou | No Underlined text.                    |
| dbu | Doubly Underlined text.                |
| cru | Curly Underlined text.                 |
| dou | Dotted Underlined text.                |
| dau | Dashed Underlined text.                |
| ruc | Reset Underlined text color.           |
| ovl | Overlined text.                        |
| noo | Not Overlined text.                    |
| blk | Blinking text.                         |
| nob | No Blinking text.                      |

## Color Overrides

You can disable colors/styles by the following methods:

- Pass `color` option `false` to the `style` function.

- Pass `--no-color` or `--color=false` to the process arguments.

- Set `FORCE_COLOR=0` in enviroment variables.

You can force enable colors/styles by setting `FORCE_COLOR=3` in enviroment variables.

## Modifier Keys Supported Terminals

| Supported Terminals | res | nor | bol | dim | ita | inv | str | hid | ovl | blk | und | dbu |
| ------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Gnome Terminal      | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |
| Konsole             | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  |
| xfce4-terminal      | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |
| MATE Terminal       | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |
| iTerm2              | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ✅  | ❌  |
| VS Code             | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ✅  | ✅  |
| Tabby               | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ✅  | ✅  |
| Hyper               | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ✅  | ❌  |
| Alacritty           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ✅  | ❌  |
| Contour             | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |
| kitty               | ✅  | ✅  | ✅  | ✅  | ❌  | ✅  | ✅  | ❌  | ❌  | ❌  | ✅  | ✅  |
| WezTerm             | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |
| Windows Terminal    | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |

## References

https://en.wikipedia.org/wiki/ANSI_escape_code

https://github.com/termstandard/colors

https://no-color.org/

https://nodejs.org/api/cli.html#force_color1-2-3

https://clrs.cc/

https://developer.chrome.com/docs/devtools/console/format-style/

## Related

- [@opentf/std](https://www.npmjs.com/package/@opentf/std) - A collection of JavaScript utility functions.

- [@opentf/cli-pbar](https://www.npmjs.com/package/@opentf/cli-pbar) - The CLI progress bar.

## License

Copyright (c) 2022, [Thanga Ganapathy](https://github.com/Thanga-Ganapathy) ([MIT License](./LICENSE)).
