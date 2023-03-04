function transformedVideoDescription(text, vidoeId) {
  // Regular expression to match URLs
  const urlRegex = /((http|https):\/\/[^\s]+)/g;

  // Replace URLs with clickable HTML links
  const htmlText = text.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>',
  );
  return htmlText;
}

export default transformedVideoDescription;
