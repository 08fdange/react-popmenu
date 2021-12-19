const getMeasures = (viewportData, viewport) => {
  if (!viewportData[viewport]) return viewportData.default;
  return viewportData[viewport];
};

export default getMeasures;