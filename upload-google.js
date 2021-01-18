module.export = {
    uploadGoogle: async (bucketName, destFileName) => {
        try {
            const { Storage } = require('@google-cloud/storage');
      
            const storage = new Storage({ keyFilename: 'go-it-project-2161ef4b99b6.json' });

            async function uploadFile() {

                await storage.bucket(bucketName).upload(filename, {
                    gzip: true,
                    metadata: {
                        cacheControl: 'public, max-age=31536000',
                    },
                    public: true,
                    private: false
                });
            
                console.log(`${filename} uploaded to ${bucketName}.`);
            }
          
            return await uploadFile(); /// https://google.cloud/adq5w4q8w4d5wd/file-d5d4a5sda5sd5a4sd.jpeg
        } catch(err) {
            console.error(err);
        }
      }
      
}


file = {
    url: 'https://google.cloud/adq5w4q8w4d5wd/file-d5d4a5sda5sd5a4sd.jpeg'
}

scr='file.url'