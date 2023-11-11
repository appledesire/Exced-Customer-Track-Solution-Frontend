// Check if the device is mobile
export function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Check if the device is a tablet
export function isTablet() {
  return /Tablet|iPad/i.test(navigator.userAgent);
}

// Function to get screen resolution
export function getScreenResolution() {
  return {
    width:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    height:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  };
}
