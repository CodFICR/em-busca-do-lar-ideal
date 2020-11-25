const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); 

const resizeImg = async (local,destination,img) => {
        
    await sharp(local)
                .resize(500)
                .jpeg({quality:70})
                .toFile(
                    path.resolve(destination,'uploads',img)
                )
                    
        fs.unlinkSync(local);
    
}

module.exports = {resizeImg}