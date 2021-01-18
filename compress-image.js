const path = require('path');
const { promises: fsPromises } = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

module.exports = {
    minifyImage: async (req, res, next) => {
        try {
            const minifiedDir = 'static';
            await imagemin([req.file.path], {
                destination: minifiedDir,
                plugins: [
                    imageminJpegtran(),
                    imageminPngquant({
                        quality: [0.6, 0.8]
                    })
                ]
            });

            const { filename, path: draftPath } = req.file;

            await fsPromises.unlink(draftPath);

            req.file = {
                ...req.file,
                path: path.join(minifiedDir, filename),
                destination: minifiedDir,
            }

            console.log('File was processed');

        } catch(err) {
            console.error(err);
        }


        next();
    }
};
