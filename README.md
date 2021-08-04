<div align="center">

# @open-tech-world/es-cli-styles
[![Build](https://github.com/open-tech-world/es-cli-styles/actions/workflows/build.yml/badge.svg)](https://github.com/open-tech-world/es-cli-styles/actions/workflows/build.yml) [![CodeFactor](https://www.codefactor.io/repository/github/open-tech-world/es-cli-styles/badge)](https://www.codefactor.io/repository/github/open-tech-world/es-cli-styles)
</div>

> Add CLI styles to text.

## Features

✔️ 24-Bit Colors (True Color)

✔️ Nested Styles

## Supported Styles

✔️ Foreground Colors

✔️ Background Colors

✔️ Bold

✔️ Dim

✔️ Italic

✔️ Underline

✔️ Inverse

✔️ Strikethrough

## Installation

Using npm

```shell
npm install @open-tech-world/es-cli-styles
```

Using Yarn

```shell
yarn add @open-tech-world/es-cli-styles
```

## Usage

```ts
import { style } from '@open-tech-world/es-cli-styles';

style('~styleName[.styleName...]{Text}');
```

## Examples

Using foreground color name

```ts
console.log(style('I like 🍊 ~orange{oranges}'))
```
![](assets/orange-color.png)

Using multiple colors

```ts
console.log(style('An ~red{apple} is red but the ~green{leaves} are green, came in a blue ~blue{box}'))
```
![](assets/multiple-colors.png)

Nested colors

```ts
console.log(style('~blue{This is a long blue text with some ~red{red} & ~green{green} color in it}'))
```
![](assets/nested-colors.png)

Composing different styles

```ts
console.log(style('~bold.white.bgGreen{ PASS }'))
```
![](assets/bg-color.png)

Inverse colors

```ts
console.log(style('~inverse.red.bgWhite{ FAILED }))
```
![](assets/inverse.png)

Faint, decreased intensity, or dim text

```ts
console.log(style('~dim{TEXT}'))
```
![](assets/dim-text.png)

Italic fonts

```ts
console.log(style('~italic.fuchsia.bold.bgWhite{ Beautiful Text }'))
```
![](assets/italic-text.png)

Underlined texts

```ts
console.log(style('Highlighted fruits: ~underline{Apple}, cat, ~underline{Banana}'))
```
![](assets/underline.png)

Strikethrough text

```ts
console.log(style('~strike.red{Deleted file.ext}'))
```
![](assets/strikethrough.png)

Custom functions

```ts
function warning(str) {
  return style(`⚠️  ~bold.black.bgYellow{${str}}`);
}

console.log(warning(' CAUTION '))
```
![](assets/caution.png)


## Style names

- #### Foreground colors
  - blue
  - red
  - green
  - orange
  - navy
  - aqua
  - teal
  - purple
  - fuchsia
  - maroon
  - yellow
  - olive
  - lime
  - black
  - gray
  - silver
  - white


- #### Background colors
  - bgBlue
  - bgRed
  - bgGreen
  - bgOrange
  - bgNavy
  - bgAqua
  - bgTeal
  - bgPurple
  - bgFuchsia
  - bgMaroon
  - bgYellow
  - bgOlive
  - bgLime
  - bgBlack
  - bgGray
  - bgSilver
  - bgWhite

- rgb(red, green, blue)

- bgRgb(red, green, blue)

- #### Modifiers
  - bold  
  - dim  
  - italic  
  - underline  
  - inverse  
  - strike  

## References

https://en.wikipedia.org/wiki/ANSI_escape_code


## License

Copyright (c) 2021, Thanga Ganapathy ([MIT License](./LICENSE)).
