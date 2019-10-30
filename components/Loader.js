import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { colors } from '../config';

export default ({ title, loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={75} color={colors.LOADING_CIRCLE} />
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.WHITE,
    zIndex: 9999,
  },
  text: {
    color: colors.BLACK,
    marginTop: 15,
    fontSize: 18,
  },
});
