const { Jimp } = require('jimp');

async function makeWhiteTransparent() {
    console.log("Loading image...");
    const image = await Jimp.read('image-frame-.png');
    
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const data = image.bitmap.data;
    
    let processed = 0;
    
    // Convert any white or near-white pixel to transparent
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i+1];
        let b = data[i+2];
        let a = data[i+3];
        
        if (a > 0 && r > 230 && g > 230 && b > 230) {
            data[i+3] = 0; // Set alpha to 0 (transparent)
            processed++;
        }
    }
    
    console.log(`Made ${processed} pixels transparent.`);
    await image.writeAsync('image-frame-transparent.png');
    console.log("Saved as image-frame-transparent.png");
}

makeWhiteTransparent().catch(console.error);
