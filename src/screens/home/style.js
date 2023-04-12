import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentage, heightPercentage, fontPercentage} from '../../Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    minHeight: '100%',
  },
  title: {
    includeFontPadding: false,
    color: '#000',
    fontSize: fontPercentage(19),
    fontWeight: 700,
    paddingVertical: heightPercentage(15),
  },
  subtitle: {
    includeFontPadding: false,
    color: '#121212',
    fontSize: fontPercentage(17),
    fontWeight: 600,
    paddingBottom: heightPercentage(5),
  },
  descript: {
    includeFontPadding: false,
    color: '#121212',
    fontSize: fontPercentage(14),
    fontWeight: 400,
    marginTop: heightPercentage(5),
  },
  contentBox: {
    marginHorizontal: widthPercentage(20),
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderRadius: 15,
    paddingHorizontal: widthPercentage(15),
    paddingVertical: heightPercentage(14),
    marginBottom: widthPercentage(10),
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: heightPercentage(2),
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 10,
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
  profileImg4: {
    width: widthPercentage(28),
    height: widthPercentage(28),
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  profileImg2: {
    width: widthPercentage(36),
    height: widthPercentage(36),
    borderRadius: 12,
    borderColor: '#fff',
    borderWidth: 2,
  },
  profileImg1: {
    width: widthPercentage(56),
    height: widthPercentage(56),
    borderRadius: 16,
  },
  icon: {
    width: widthPercentage(15),
    height: widthPercentage(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceTitle: {
    marginTop: heightPercentage(10),
    marginHorizontal: widthPercentage(20),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceB: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default styles;