const youtubeParams = [
  // 'controls=0',
  'showinfo=0',
  'modestbranding=0',
  'color=white',
  'rel=0'
].join('&');

export const getYoutubeLink = (key: string) => `https://www.youtube.com/embed/${key}?${youtubeParams}`;