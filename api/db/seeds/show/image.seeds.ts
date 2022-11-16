import {images} from '../../data';
import {imageTable} from '../../tables';
import {Seeds} from '../Seeds';

export const imageSeeds = new Seeds(imageTable.name);

imageSeeds.setData(async () => {
  return images.map((image, idx) => ({
    id: idx + 1,
    url: image.img,
    thumbnail: image.thumb,
    copyright: image.copyright,
    persons: image.persons,
    bases: image.bases,
    baseType: image.baseType,
    mediaId: image.mediaId,
  }));
});
