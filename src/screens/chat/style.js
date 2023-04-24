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
    backgroundColor: 'EAEAEC', //'#f4f6f9',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    minHeight: '100%',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: heightPercentage(10),
  },
  views: {
    paddingTop: heightPercentage(40),
    flexGrow: 1,
  },
  playButtonContainer: {
    marginHorizontal: widthPercentage(50),
    borderWidth: 0.5,
    borderColor: '#bbb',
    borderRadius: 40,
  },
  textLight: {
    color: '#B6B7BF',
  },
  text: {
    color: '#8E97A6',
  },
  titleContainer: {alignItems: 'center', marginTop: 24},
  textDark: {
    color: '#3D425C',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    paddingVertical: heightPercentage(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  coverContainer: {
    marginTop: 32,
    width: 250,
    height: 250,
    shadowColor: '#5D3F6A',
    shadowOffset: {height: 15},
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  cover: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: '#3D425C',
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: '500',
  },
  seekbar: {margin: 32},
  inprogress: {
    marginTop: -12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackname: {alignItems: 'center', marginTop: 32},
  descText: {
    includeFontPadding: false,
    color: '#555',
    fontSize: fontPercentage(20),
    fontWeight: 300,
    marginLeft: widthPercentage(5),
    paddingVertical: heightPercentage(5),
    paddingRight: widthPercentage(15),
  },
  timeText: {
    includeFontPadding: false,
    color: '#121212',
    fontSize: fontPercentage(40),
    fontWeight: 500,
    marginLeft: widthPercentage(5),
    paddingVertical: heightPercentage(5),
    paddingRight: widthPercentage(15),
  },
});

export default styles;
