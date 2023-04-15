import fetch from 'node-fetch';

/**
 * CREDIT TO: https://github.com/andyruwruw/andyruwruw
 * Converts an image URL to base64 string.
 *
 * @param {string} imageUrl URL to image to convert.
 * @returns {string} Base64 string of image.
 */
export const getImageData = async (imageUrl: string) => {
    if (imageUrl) {
      const buff: ArrayBuffer = await (await fetch(imageUrl)).arrayBuffer();
      return `data:image/jpeg;base64,${Buffer.from(buff).toString('base64')}`;
    }
  };