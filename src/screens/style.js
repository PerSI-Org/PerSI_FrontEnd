import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentage, heightPercentage, fontPercentage} from '../Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    minHeight: '100%',
  },
  label: {
    includeFontPadding: false,
    color: '#121212',
    fontSize: fontPercentage(12),
    marginLeft: widthPercentage(5),
    paddingVertical: heightPercentage(5),
    paddingRight: widthPercentage(15),
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightPercentage(15),
    backgroundColor: '#60AAEF',
    margin: widthPercentage(15),
    borderRadius: 7,
  },
  line: {
    height: heightPercentage(1),
    width: '100%',
    backgroundColor: '#777777',
    marginVertical: heightPercentage(4),
  },
  phoneBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: heightPercentage(10),
    backgroundColor: '#E2E9FB',
    borderRadius: 7,
  },
  btnText: {
    includeFontPadding: false,
    fontSize: fontPercentage(16),
    fontWeight: '700',
    color: '#fff',
  },
});

export default styles;
