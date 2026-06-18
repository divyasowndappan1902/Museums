const sharp = require('sharp');
const path = require('path');

const src1 = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\97005d8c-0fe9-4199-a785-771203dcb160\\youth_programs_1781777926434.png';
const src2 = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\97005d8c-0fe9-4199-a785-771203dcb160\\local_artists_1781777940010.png';

const dst1 = 'c:\\Users\\Admin\\Desktop\\Museum theme\\images\\youth_programs.webp';
const dst2 = 'c:\\Users\\Admin\\Desktop\\Museum theme\\images\\local_artists.webp';

async function convert() {
  await sharp(src1).resize(800).webp({ quality: 60 }).toFile(dst1);
  await sharp(src2).resize(800).webp({ quality: 60 }).toFile(dst2);
  console.log('Images converted');
}
convert().catch(console.error);
