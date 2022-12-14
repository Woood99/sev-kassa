export const getHeaderHeight = () => {
  const headerHeight = document?.querySelector('.header').offsetHeight;
  document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
}

export const getTopInfoHeight = () => {
  const topInfo = document?.querySelector('.top-info').offsetHeight;
  document.querySelector(':root').style.setProperty('--top-info-height', `${topInfo}px`);
}
