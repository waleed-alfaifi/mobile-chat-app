import React from 'react';
import { Header, Title, View, Left, Right, Body } from 'native-base';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../config';

export default ({ title }) => {
  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Body>
          <Title style={styles.center}>{title}</Title>
        </Body>
      </Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GRAY,
  },
  header: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: colors.GRAY,
    marginTop: Constants.statusBarHeight,
  },
  center: {
    alignSelf: 'center',
  },
});
