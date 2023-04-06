import {Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const ZEPLIN__WINDOW__WIDTH = 375;
const ZEPLIN__WINDOW__HEIGHT = 812;

export const widthScreen = Dimensions.get('screen').width;
export const heightScreen = Dimensions.get('screen').height;

export const widthPercentage = width => {
  const percentage = (width / ZEPLIN__WINDOW__WIDTH) * 100;

  return responsiveWidth(percentage);
};
export const heightPercentage = height => {
  const percentage = (height / ZEPLIN__WINDOW__HEIGHT) * 100;

  return responsiveHeight(percentage);
};
export const fontPercentage = size => {
  const percentage = (heightScreen / ZEPLIN__WINDOW__HEIGHT) * size;
  return percentage;
};
