const test = require("ava");
const crop = require("..");

const run = async name => crop(`./test/fixtures/${name}.png`);

test("drawing", async (t) => {
    const res = await run("drawing");
    t.snapshot(res);
});

test("full", async (t) => {
    const res = await run("full");
    t.snapshot(res);
});

test("transparent", async (t) => {
    await t.throwsAsync(() => run("transparent", "Can't detect edges."));
});

test("detect only", async (t) => {
    const edges = await crop("./test/fixtures/drawing.png", {
        detectOnly: true,
    });
    t.deepEqual(edges, {
        top: 8,
        right: 15,
        bottom: 21,
        left: 8,
    });
});

test("bad output format", async (t) => {
    await t.throwsAsync(() => crop("file.png", {
        outputFormat: "what",
    }), /but "what" was given.$/);
});

test("no file", async (t) => {
    await t.throwsAsync(() => crop(), "No file given.");
    await t.throwsAsync(() => crop(""), "No file given.");
    await t.throwsAsync(() => crop("whoot.png"), /no such file/i);
});
