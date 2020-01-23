import Canvas from "canvas";
import detect from "detect-edges";

const { loadImage, createCanvas } = Canvas;

const defaultOptions = {
    outputFormat: "png",
};

/**
 * @typedef {Object} Options
 * @prop {String} [outputFormat="png"] - Format of the output image (`"png"` or `"jpeg"`)
 */
/**
 * Crop transparent pixels from an image
 * @param {String|HTMLCanvasElement} input - Path to the image to process or a tainted canvas
 * @param {Options} options - Some options
 * @returns {Promise<Buffer>}
 */
export default async (input, options) => {
    const { outputFormat } = {
        ...defaultOptions,
        ...options,
    };

    if (!input) {
        throw new Error("No input given.");
    }

    const supportedFormat = ["png", "jpeg"];
    if (!supportedFormat.includes(outputFormat)) {
        const supported = JSON.stringify(supportedFormat);
        throw new Error(`outputFormat should only be one of ${supported}, but "${outputFormat}" was given.`);
    }

    const isString = typeof input === "string";

    let canvas;
    let image;

    if (isString) {
        image = await loadImage(input);
        const { width, height } = image;
        canvas = createCanvas(width, height);
    }
    else {
        canvas = input;
    }

    const { width, height } = canvas;
    const context = canvas.getContext("2d");

    if (isString) {
        context.drawImage(image, 0, 0, width, height);
    }

    const data = context.getImageData(0, 0, width, height);

    const { top, right, bottom, left } = detect(canvas, options);

    canvas.width = width - (left + right);
    canvas.height = height - (top + bottom);
    context.putImageData(data, -left, -top);

    return canvas.toBuffer(`image/${outputFormat}`);
};
