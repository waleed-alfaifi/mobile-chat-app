import { StyleSheet } from 'react-native';
import { colors } from '../../config';

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: colors.GRAY,
    padding: 30,
  },
  avatar: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 200,
    marginBottom: 20,
  },
  name: {
    alignSelf: 'center',
    color: colors.WHITE,
  },
  status: {
    alignSelf: 'center',
    marginTop: 10,
  },
  about: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});

export default styles;
