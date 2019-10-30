import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import {
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Text,
  Toast,
  View,
} from 'native-base';
import { Header } from '../components';
import { auth, axios, strings, urls } from '../config';
import styles from './styles/auth';

class PasswordScreen extends Component {
  state = {
    password: '',
    newPassword: '',
  };

  onPasswordChange = password => this.setState({ password });

  onNewPasswordChange = newPassword => this.setState({ newPassword });

  validate() {
    Keyboard.dismiss();
    if (!this.state.password) {
      Toast.show({ text: strings.PASSWORD_REQUIRED, type: 'danger' });
      return false;
    }
    if (!this.state.newPassword) {
      Toast.show({ text: strings.NEW_PASSWORD_REQUIRED, type: 'danger' });
      return false;
    }
    return true;
  }

  send = async () => {
    if (!this.validate()) return;
    let data = {
      password: this.state.password,
      newPassword: this.state.newPassword,
    };
    try {
      axios.defaults.headers.common.Authorization = await auth.getToken();
      await axios.post(urls.CHANGE_PASSWORD, data);
      this.setState({ password: '', newPassword: '' });
      Toast.show({ text: strings.PASSWORD_CHANGED, type: 'success' });
    } catch (e) {
      Toast.show({ text: e.response.data.error, type: 'danger' });
    }
  };

  render() {
    return (
      <Container>
        <Header title={strings.TITLE_CHANGE_PASSWORD} />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content>
            <View style={styles.form}>
              <Item rounded style={styles.inputItem}>
                <Input
                  style={styles.input}
                  placeholder={strings.PASSWORD_PLACEHOLDER}
                  secureTextEntry={true}
                  onChangeText={this.onPasswordChange}
                  value={this.state.password}
                />
                <Icon name="lock" style={styles.icon} />
              </Item>
              <Item rounded style={styles.inputItem}>
                <Input
                  style={styles.input}
                  placeholder={strings.NEW_PASSWORD_PLACEHOLDER}
                  secureTextEntry={true}
                  onChangeText={this.onNewPasswordChange}
                  value={this.state.newPassword}
                />
                <Icon name="lock" style={styles.icon} />
              </Item>
              <Button
                rounded
                info
                block
                style={styles.button}
                onPress={this.send}
              >
                <Text>{strings.SEND}</Text>
              </Button>
            </View>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default PasswordScreen;
