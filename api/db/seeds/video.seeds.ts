import {videos} from '../data';
import {videoTable} from '../tables';
import {Seeds} from './Seeds';

export const videoSeeds = new Seeds(videoTable.name);

videoSeeds.setData(async () => {
  return videos.map((video, idx) => ({
    id: idx + 1,
    url: video.video,
    thumbnail: video.thumb,
    copyright: video.copyright,
    persons: video.persons,
    bases: video.bases,
    baseType: video.baseType,
    mediaId: video.mediaId,
  }));
});
