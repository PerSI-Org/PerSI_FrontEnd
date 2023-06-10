import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentage,
  heightPercentage,
  fontPercentage,
} from '../../Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#60AAEF',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    height: '100%',
  },
  title: {
    includeFontPadding: false,
    color: '#fff',
    alignSelf: 'center',
    fontSize: fontPercentage(36),
    marginBottom: widthPercentage(6),
    fontWeight: 700,
  },
  spaceTitle: {
    marginTop: heightPercentage(10),
    marginHorizontal: widthPercentage(20),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemBox: {
    marginBottom: heightPercentage(30),
    marginHorizontal: widthPercentage(40),
  },
  nameInputBox: {
    height: heightPercentage(50),
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: heightPercentage(15),
    paddingLeft: widthPercentage(20),
    marginLeft: widthPercentage(0),
    color: '#fff',
    fontSize: fontPercentage(17),
  },
  nameInputBox2: {
    height: heightPercentage(50),
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f55',
    marginTop: heightPercentage(15),
    paddingLeft: widthPercentage(20),
    marginLeft: widthPercentage(0),
    color: '#fff',
    fontSize: fontPercentage(17),
  },
  desc: {
    includeFontPadding: false,
    color: '#fff',
    alignSelf: 'flex-end',
    fontSize: fontPercentage(15),
    fontWeight: 400,
    marginTop: heightPercentage(2),
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentage(15),
    marginVertical: heightPercentage(15),
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  btnText: {
    includeFontPadding: false,
    fontSize: fontPercentage(19),
    fontWeight: '700',
    color: '#60AAEF',
  },
});

export default styles;
