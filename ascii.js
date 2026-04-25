const { Jimp } = require('jimp');

async function asciiArt() {
    const image = await Jimp.read('image-frame-.png');
    image.resize({ w: 50, h: 50 });
    
    let out = "";
    for (let y = 0; y < 50; y++) {
        let row = "";
        for (let x = 0; x < 50; x++) {
            const color = image.getPixelColor(x, y);
            const r = Jimp.intToRGBA(color).r;
            const a = Jimp.intToRGBA(color).a;
            
            if (a === 0) row += " "; // transparent
            else if (r > 200) row += "W"; // white
            else row += "#"; // dark
        }
        out += row + "\n";
    }
    console.log(out);
}

asciiArt().catch(console.error);
