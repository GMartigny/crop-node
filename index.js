const { createCanvas, loadImage } = require("canvas");

/**
 * Check pixels transparency
 * @param {Array} pixels - Array of pixel data
 * @returns {Boolean}
 */
const isTransparent = (pixels) => {
    let transparent = true;
    for (let i = 3, l = pixels.length; i < l && transparent; i += 4) {
        transparent = transparent && pixels[i] === 0;
    }
    return transparent;
};

const defaultOptions = {
    outputFormat: "png",
    detectOnly: false,
};

/**
 * @typedef {Object} Options
 * @prop {String} [outputFormat="png"] - Format of the output image (`"png"` or `"jpeg"`)
 * @prop {Boolean} [detectOnly=false] - Only return the detected edges
 */
/**
 * Crop transparent pixels from an image
 * @param {String} path - Path to the image to process
 * @param {Options} options - Some options
 * @returns {Promise<Buffer>}
 */
module.exports = async (path, options) => {
    const { outputFormat, detectOnly } = {
        ...defaultOptions,
        ...options,
    };

    if (!path || !path.length) {
        throw new Error("No file given.");
    }

    const supportedFormat = ["png", "jpeg"];
    if (!supportedFormat.includes(outputFormat)) {
        const supported = JSON.stringify(supportedFormat);
        throw new Error(`outputFormat should only be one of ${supported}, but "${outputFormat}" was given.`);
    }

    const image = await loadImage(path);
    const { width, height } = image;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    context.drawImage(image, 0, 0);

    let pixels;

    // Top
    let top = -1;
    do {
        ++top;
        pixels = context.getImageData(0, top, width, 1).data;
    } while (isTransparent(pixels));

    if (top === height) {
        throw new Error("Can't detect edges.");
    }

    // Left
    let left = -1;
    do {
        ++left;
        pixels = context.getImageData(left, top, 1, height - top).data;
    } while (isTransparent(pixels));

    // Bottom
    let bottom = -1;
    do {
        ++bottom;
        pixels = context.getImageData(left, height - bottom - 1, width - left, 1).data;
    } while (isTransparent(pixels));

    // Right
    let right = -1;
    do {
        ++right;
        pixels = context.getImageData(width - right - 1, top, 1, height - (top + bottom)).data;
    } while (isTransparent(pixels));

    if (detectOnly) {
        return {
            top,
            right,
            bottom,
            left,
        };
    }

    canvas.width = width - (left + right);
    canvas.height = height - (top + bottom);
    context.drawImage(image, -left, -top);

    return canvas.toBuffer(`image/${outputFormat}`);
};
