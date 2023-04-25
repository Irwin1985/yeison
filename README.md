# yeison
Yet another JSON parser library for Visual Foxpro 9.0

## Introduction
This library is a JSON parser for Visual Foxpro 9.0. It follows the JSON specification rules and it is compatible with the JSON standard.

The tokenizer is handled by the [yeison-tokenizer](https://github.com/Irwin1985/yeison/blob/master/yeison.js) library which is embedded in the yeison.prg file. This way we can leverage the power of MSScriptControl to parse the JSON string so we expect a better performance.

## Usage
```foxpro
* Load the library
set procedure to "yeison.prg" additive

* Parse a JSON string
local loJson
loJson = yeison.parse('{"name":"John","age":30,"cars":["Ford","BMW","Fiat"]}')

```