const breakpoints = {
    mobile: 413,
    tablet: 767,
    desktopSmall: 1023,
    desktop: 1279,
};

const breakpointSpecs = {
  desktop: {
    max: null,
    min: breakpoints.desktop,
  },
  desktopSmall: {
    max: breakpoints.desktop,
    min: breakpoints.desktopSmall,
  },
  tablet: {
    max: breakpoints.desktopSmall,
    min: breakpoints.tablet,
  },
  mobile: {
    max: breakpoints.tablet,
    min: breakpoints.mobile,
  },
  mobileSmall: {
    max: breakpoints.mobile,
    min: 0,
  },
};

const desktopQuery = `screen and (min-width:${breakpoints.desktop}px)`;
const desktopSmallQuery = `screen and (min-width:${breakpoints.desktopSmall}px) and (max-width:${breakpoints.desktop}px)`;
const tabletQuery = `screen and (min-width:${breakpoints.tablet}px) and (max-width:${breakpoints.desktopSmall}px)`;
const mobileQuery = `screen and (min-width:${breakpoints.mobile}px) and (max-width:${breakpoints.tablet}px)`;
const mobileSmallQuery = `screen and (min-width:0px) and (max-width:${breakpoints.mobile}px)`;

const portraitQuery = 'screen and (orientation: portrait)';
const landscapeQuery = 'screen and (orientation: landscape)';

const breakpointQueries = {
  desktopQuery,
  desktopSmallQuery,
  tabletQuery,
  mobileQuery,
  mobileSmallQuery,
  portraitQuery,
  landscapeQuery,
};

export { breakpointSpecs, breakpointQueries };