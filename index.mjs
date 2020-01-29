import Canvas from "canvas";
import crop from "crop-universal";

const defaultOptions = {
    outputFormat: "png",
};

const cropper = crop(Canvas);

/**
 * @typedef {Object} Options
 * @prop {String} [outputFormat="png"] - Format of the output image (`"png"` or `"jpeg"`)
 */
/**
 * Crop transparent pixels from an image
 * @param {String|Canvas.Canvas|Canvas.Image} input - Path to the image to process, another Canvas or an Image
 * @param {Options} options - Some options
 * @returns {Promise<Buffer>}
 */
export default async (input, options) => {
    const { outputFormat } = {
        ...defaultOptions,
        ...options,
    };

    // Check outputFormat
    const supportedFormat = ["png", "jpeg"];
    if (!supportedFormat.includes(outputFormat)) {
        const supported = JSON.stringify(supportedFormat);
        throw new Error(`outputFormat should only be one of ${supported}, but "${outputFormat}" was given.`);
    }

    // Do crop
    const canvas = await cropper(input, options);

    // Export as a buffer
    return new Promise((resolve, reject) => canvas.toBuffer((error, buffer) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(buffer);
        }
    }, `image/${outputFormat}`));
};
