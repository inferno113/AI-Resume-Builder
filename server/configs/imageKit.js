import ImageKit from 'imagekit';

const imagekit = new ImageKit({

    privatekey: process.env.IMAGEKIT_PRIVATE_KEY,

})

export default imagekit;