import {StyleSheet} from 'react-native';
import {widthPercentage, heightPercentage, fontPercentage} from '/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    height: '100%',
  },
  imageContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: heightPercentage(10),
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
  buttonContainer: {
    backgroundColor: '#fff',
    paddingVertical: heightPercentage(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seekbar: {
    paddingHorizontal: widthPercentage(30),
    backgroundColor: '#fff',
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
  },
  thumb: {
    width: 5,
    height: 5,
    backgroundColor: '#3D425C',
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: widthPercentage(20),
  },
  inprogress: {
    marginTop: -12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  chatBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: widthPercentage(10),
    marginTop: heightPercentage(25),
  },
  speech: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 13,
    borderTopLeftRadius: 0,
    paddingHorizontal: widthPercentage(12),
    paddingVertical: heightPercentage(10),
    marginRight: widthPercentage(10),
    marginTop: heightPercentage(8),
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: heightPercentage(1),
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
  },
  contents: {
    includeFontPadding: false,
    color: '#111',
    fontSize: fontPercentage(17),
    fontWeight: 500,
    marginRight: widthPercentage(5),
  },
  nameText: {
    includeFontPadding: false,
    color: '#111',
    fontSize: fontPercentage(18),
    fontWeight: 600,
    marginRight: widthPercentage(5),
  },
  timeStamp: {
    includeFontPadding: false,
    color: '#555',
    fontSize: fontPercentage(16),
    fontWeight: 300,
    marginLeft: widthPercentage(5),
  },
});

export default styles;
