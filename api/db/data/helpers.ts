import {AttachmentType} from '@acrommunity/common';

export function mapAttachment(input: string) {
  const instagramPrefix = 'https://www.instagram.com/p/';
  const youtubePrefix = 'https://www.youtube.com/watch?v=';
  const youtubeShortPrefix = 'https://www.youtube.com/shorts/';
  const youtubeNoCookiePrefix = 'https://www.youtube-nocookie.com/embed/';


  if (input.startsWith(youtubePrefix)) {
    const videoId = input.substr(youtubePrefix.length);
    return {url: youtubeNoCookiePrefix + videoId, type: AttachmentType.YouTube};
  }
  if (input.startsWith(youtubeShortPrefix)) {
    const videoId = input.substr(youtubeShortPrefix.length);
    return {url: youtubeNoCookiePrefix + videoId, type: AttachmentType.YouTube};
  }
  if (input.startsWith(youtubeNoCookiePrefix)) {
    return {url: input, type: AttachmentType.YouTube};
  }
  if (input.startsWith(instagramPrefix)) {
    return {url: input, type: AttachmentType.Instagram};
  }
  if (input.match(/\.[webp|jpg|jpeg]/)) {
    return {url: input, type: AttachmentType.Image};
  }

  console.warn('Unknown Attachment: ', input);
  return {url: input, type: AttachmentType.Image};
}
