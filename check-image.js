const { Jimp } = require('jimp');

async function checkImage() {
    console.log("Loading image...");
    const image = await Jimp.read('image-frame-.png');
    
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const data = image.bitmap.data;
    
    let whiteCount = 0;
    let transparentCount = 0;
    let total = w * h;
    
    for (let i = 0; i < data.length; i += 4) {
        if (data[i+3] === 0) {
            transparentCount++;
        } else if (data[i] > 240 && data[i+1] > 240 && data[i+2] > 240) {
            whiteCount++;
        }
    }
    
    console.log(`Image size: ${w}x${h}`);
    console.log(`Total pixels: ${total}`);
    console.log(`Transparent pixels: ${transparentCount}`);
    console.log(`White pixels: ${whiteCount}`);
    
    // Output center 10x10 pixels alpha
    const cx = Math.floor(w/2);
    const cy = Math.floor(h/2);
    let centerAlphas = [];
    for (let y = cy - 5; y < cy + 5; y++) {
        for (let x = cx - 5; x < cx + 5; x++) {
            centerAlphas.push(data[(y * w + x) * 4 + 3]);
        }
    }
    console.log("Center alphas:", centerAlphas.join(","));
}

checkImage().catch(console.error);
