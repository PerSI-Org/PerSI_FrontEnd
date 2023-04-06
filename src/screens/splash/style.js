import {fLBig} from 'common/font';
import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentage, heightPercentage, fontPercentage} from '../../Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: widthPercentage(20),
    paddingRight: widthPercentage(20),
    paddingBottom: heightPercentage(40),
  },
});

export default styles;
