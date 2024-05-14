import test from "ava";
import Canvas from "canvas";
import crop from "../index.js";

const run = async name => crop(`./test/fixtures/${name}.png`);

test("drawing", async (t) => {
    const res = await run("drawing");
    t.snapshot(res);
});

test("full", async (t) => {
    const res = await run("full");
    t.snapshot(res);
});

test("input canvas", async (t) => {
    const { createCanvas } = Canvas;
    const canvas = createCanvas(100, 200);
    const context = canvas.getContext("2d");
    context.fillRect(10, 20, 10, 20);

    const res = await crop(canvas);
    t.snapshot(res);
});

test("transparent", async (t) => {
    await t.throwsAsync(() => run("transparent", {
        message: "Can't detect edges.",
    }));
});

test("bad output format", async (t) => {
    await t.throwsAsync(() => crop("file.png", {
        outputFormat: "what",
    }), {
        message: /but "what" was given.$/,
    });
});

test("no file", async (t) => {
    await t.throwsAsync(() => crop(), {
        message: "No input given.",
    });
    await t.throwsAsync(() => crop(""), {
        message: "No input given.",
    });
    await t.throwsAsync(() => crop("whoot.png"), {
        message: /no such file/i,
    });
});
