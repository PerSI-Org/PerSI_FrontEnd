import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentage, heightPercentage, fontPercentage} from '/Responsive';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: widthPercentage(40),
    paddingHorizontal: widthPercentage(20),
    paddingVertical: widthPercentage(20),
    width: widthPercentage(340),
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 17,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: heightPercentage(10),
  },
  imageContainer: {
    marginHorizontal: widthPercentage(20),
    marginVertical: widthPercentage(20),
    backgroundColor: '#EAEAEC', //'#f4f6f9',
    width: '100%',
    padding: widthPercentage(15),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  scriptContainer: {
    marginHorizontal: widthPercentage(20),
    marginVertical: widthPercentage(20),
    backgroundColor: '#EAEAEC', //'#f4f6f9',
    width: '100%',
    height: heightPercentage(300),
    padding: widthPercentage(15),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  contentImage: {
    width: widthPercentage(100),
    height: widthPercentage(100),
  },
  title: {
    textAlign: 'center',
    includeFontPadding: false,
    color: '#121212',
    fontSize: fontPercentage(22),
    fontWeight: 500,
    marginLeft: widthPercentage(5),
    paddingVertical: heightPercentage(10),
    paddingRight: widthPercentage(15),
  },
  text: {
    textAlign: 'center',
    includeFontPadding: false,
    color: '#555',
    fontSize: fontPercentage(16),
    fontWeight: 300,
    marginLeft: widthPercentage(5),
    paddingVertical: heightPercentage(3),
    paddingRight: widthPercentage(15),
  },
  spaceB: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calcelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentage(17),
    paddingHorizontal: heightPercentage(50),
    marginTop: heightPercentage(25),
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#60AAEF',
  },
  calcelBtnText: {
    includeFontPadding: false,
    fontSize: fontPercentage(19),
    fontWeight: '700',
    color: '#60AAEF',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentage(17),
    paddingHorizontal: heightPercentage(50),
    marginTop: heightPercentage(25),
    backgroundColor: '#60AAEF',
    borderRadius: 7,
  },
  longButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: heightPercentage(17),
    paddingHorizontal: heightPercentage(50),
    marginTop: heightPercentage(25),
    backgroundColor: '#60AAEF',
    borderRadius: 7,
  },
  btnText: {
    includeFontPadding: false,
    fontSize: fontPercentage(19),
    fontWeight: '700',
    color: '#fff',
  },
});

export default styles;