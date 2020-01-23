# crop-node

[![Package version](https://flat.badgen.net/npm/v/crop-node)](https://www.npmjs.com/package/crop-node)
[![Package size](https://badgen.net/bundlephobia/minzip/crop-node)](https://bundlephobia.com/result?p=crop-node)

Crop all transparent pixel around an image's edges. ([CLI version](https://github.com/gmartigny/crop-node-cli))

## Installation

    npm install crop-node


## Usage

```js
const crop = require("crop-noode");

// Path to an image file
const path = "path/to/image.png";
const options = {
    outputFormat: "png",
};
// Run the async function and write the result
(async () => {
    const cropped = await crop(path, options);
    // Write the file (for example)
    writeFileSync("cropped.png", cropped);
})();
```


## Documentation

### `crop(input, [options])`

| Name | Type | Default | Comment |
| --- | --- | --- | --- |
|input |`String|HTMLCanvasElement` |required |Path to the image to process or a tainted canvas |
|options |`Options` |(see below) |Some options |

### `options`

| Name | Type | Default | Comment |
| --- | --- | --- | --- |
|outputFormat |`String` |`"png"` |Format of the output image (`"png"` or `"jpeg"`) |

In addition, all [options of `detect-edges`](https://github.com/GMartigny/detect-edges#options) are supported.


## License

[MIT](license)
