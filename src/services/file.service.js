const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadPost(file){

    const result = await client.files.upload({
        file,
        fileName: "post_image.jpg",
        folder: "test_Creation_Posts",
    })

    return result;
}

async function uploadMusic(file){

    const result = await client.files.upload({
        file,
        fileName: "music_"+ Date.now(),
        folder: "test_Creation_Music",
    })

    return result;
}

module.exports = {uploadPost, uploadMusic};