import React from 'react';

const RenderAttachment = (file, url) => {
  switch (file) {
    case 'video':
      <Video src={url} preload="none" width={'200px'} controls />;
      break;
    case 'image':
      <img src={url} alt="attachment" loading="lazy" />;
      break;

    default:
      break;
  }
};

export default RenderAttachment;
