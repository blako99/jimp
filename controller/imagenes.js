var Jimp = require("jimp");

const shadow = require("@jimp/plugin-shadow");

//const configure = require("@jimp/custom");

//const Jimp = configure({ plugins: [shadow] }, Jimp);

const circle = require("@jimp/plugin-circle");

async function createImagen(req, res) {
    const image = await Jimp.read("blackbass.jpg");

    image.circle();

    image.shadow();
    // or
    //image.circle({ radius: 50, x: 25, y: 25 });

    let font;

    let width = image.bitmap.width;

    switch (true) {
        case width < 300:
            font = await Jimp.loadFont(Jimp.FONT_SANS_8_WHITE);
            break;
        case width < 800:
            font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
            break;
        case width < 2300:
            font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            break;
        case width < 3300:
            font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            break;

        case width >= 3300:
            font = await MJimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            break;

        default:
            console.log(width);
            font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    }
    const LOGO_MARGIN_PERCENTAGE = 10;

    const xMargin = (image.bitmap.height * LOGO_MARGIN_PERCENTAGE) / 100;

    image.print(
        font,
        xMargin, -xMargin,
        (text = {
            text: "Black bass 600g",
            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
            alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
        }),
        image.bitmap.width,
        image.bitmap.height
    );

    image.writeAsync((path = "dani.png"), function(e) {
        if (e) console.log("Error");

        console.log("Imagen guardada con exito");
    });

    res.status(200).send("Imagen generada");
}

async function pruebados() {
    const image = "enorme.jpg";

    const ORIGINAL_IMAGE = image;

    const LOGO = "wefishlogo.png";

    const LOGO_MARGIN_PERCENTAGE = 5;

    const FILENAME = "junio.jpg";

    const main = async() => {
        const [image, logo] = await Promise.all([
            Jimp.read(ORIGINAL_IMAGE),
            Jimp.read(LOGO),
        ]);

        logo.resize(image.bitmap.width / 10, Jimp.AUTO);

        logo.background(0x00000000);

        const margin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

        const x = image.bitmap.width - logo.bitmap.width - margin;
        const y = margin;

        return image.composite(logo, x, y, [{
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.1,
            opacityDest: 1,
        }, ]);
    };

    main().then(
        (image) => {
            console.log("Imagen guardada con exito ");
            image.write(FILENAME);
        },
        function(e) {
            console.log("err");
        }
    );
}
async function test() {
    let i = new Jimp(256, 256, (err, image) => {});

    i.write("aaaaaa.jpg");
}

module.exports = {
    pruebados,
    createImagen,
    test,
};