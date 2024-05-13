# crop-node

[![Package version](https://flat.badgen.net/npm/v/crop-node)](https://www.npmjs.com/package/crop-node)
[![Package size](https://flat.badgen.net/bundlephobia/minzip/crop-node)](https://bundlephobia.com/result?p=crop-node)

Crop all transparent pixel around an image's edges. ([CLI version](https://github.com/GMartigny/crop-node-cli))


## Installation

    npm install crop-node


## Usage

```js
import crop from "crop-node";
import { writeFileSync } from "fs";

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
|input |`String\|any` |required |Path to the image to process or any [type supported by `Canvas.prototype.drawImage`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage#Parameters) |
|options |`Options` |(see below) |Some options |

### `options`

| Name | Type | Default | Comment |
| --- | --- | --- | --- |
|outputFormat |`String` |`"png"` |Format of the output image (`"png"` or `"jpeg"`) |

In addition, all [options of `detect-edges`](https://github.com/GMartigny/detect-edges#options) are supported.


## Related

 - CLI version [`crop-node-cli`](https://github.com/GMartigny/crop-node-cli)
 - Browser version [`crop-browser`](https://github.com/GMartigny/crop-browser)
 - Environment agnostic [`crop-universal`](https://github.com/GMartigny/crop-universal)


## License

[MIT](license)
