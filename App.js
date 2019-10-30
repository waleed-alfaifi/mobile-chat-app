import React from 'react';
import { AppLoading } from 'expo';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import AppNavigator from './config/routes';
import { ChatProvider } from './context/ChatProvider';

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  async _getFonrs() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      'noto-font': require('./assets/fonts/NotoKufiArabic-Regular.ttf'),
    });
  }

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this._getFonrs}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return (
      <ChatProvider>
        <Root>
          <AppNavigator />
        </Root>
      </ChatProvider>
    );
  }
}
