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
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    minHeight: '100%',
  },
  imgBox: {
    marginTop: heightPercentage(45),
    alignItems: 'center',
    marginBottom: heightPercentage(35),
  },
  profileImg: {
    width: widthPercentage(80),
    height: widthPercentage(80),
    borderRadius: 100,
  },
  iconCamera: {
    width: widthPercentage(26),
    height: widthPercentage(26),
    position: 'absolute',
    borderRadius: 50,
    bottom: 0,
    right: 0,
  },
  title: {
    includeFontPadding: false,
    color: '#000',
    fontSize: fontPercentage(19),
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
    marginHorizontal: widthPercentage(20),
  },
  nameInputBox: {
    height: heightPercentage(50),
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    marginTop: heightPercentage(5),
    paddingLeft: widthPercentage(20),
    marginLeft: widthPercentage(0),
    color: '#121212',
    fontSize: fontPercentage(17),
  },
  desc: {
    includeFontPadding: false,
    color: '#333',
    fontSize: fontPercentage(15),
    fontWeight: 400,
    marginTop: heightPercentage(2),
  },
  button: {
    marginHorizontal: widthPercentage(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentage(15),
    marginVertical: heightPercentage(15),
    backgroundColor: '#60AAEF',
    borderRadius: 10,
  },
  btnText: {
    includeFontPadding: false,
    fontSize: fontPercentage(19),
    fontWeight: '700',
    color: '#fff',
  },
  recordingButton: {
    width: widthPercentage(160),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentage(15),
    marginVertical: heightPercentage(15),
    backgroundColor: '#F1F3F5',
    borderRadius: 10,
  },
  spaceB: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recordingText: {
    includeFontPadding: false,
    fontSize: fontPercentage(19),
    fontWeight: '700',
    color: '#5F5F5F',
  },
  colCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    width: widthPercentage(40),
    height: widthPercentage(40),
    borderRadius: 100,
    marginBottom: heightPercentage(20),
  },
});

export default styles;
