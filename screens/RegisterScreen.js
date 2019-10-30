import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import { strings, axios as Axios, urls, auth } from '../config';
import {
  Toast,
  Container,
  Content,
  View,
  Text,
  Item,
  Input,
  Icon,
  Button,
} from 'native-base';
import styles from './styles/auth';
import companyLogo from '../assets/images/logo.png';
import { Loader } from '../components';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      isLoading: false,
    };
  }

  onNameChange = name => this.setState({ name });

  onUsernameChange = username => this.setState({ username });

  onPassowrdChange = password => this.setState({ password });

  validate() {
    Keyboard.dismiss();
    if (!this.state.name) {
      Toast.show({ text: strings.NAME_REQUIRED, type: 'danger' });
      return false;
    }
    if (!this.state.username) {
      Toast.show({ text: strings.USERNAME_REQUIRED, type: 'danger' });
      return false;
    }
    if (!this.state.password) {
      Toast.show({ text: strings.PASSWORD_REQUIRED, type: 'danger' });
      return false;
    }
    return true;
  }

  register = async () => {
    if (!this.validate()) return;
    let data = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };
    try {
      this.setState({ isLoading: true });
      let response = await Axios.post(urls.REGISTER, data);
      auth.setUser(response.data);
      this.setState({ isLoading: false });
      this.props.navigation.navigate('Home');
    } catch (e) {
      this.setState({ isLoading: false });
      Toast.show({ text: e.response.data.error, type: 'danger' });
    }
  };

  backToLogin = () => this.props.navigation.navigate('Login');

  render() {
    return (
      <Container>
        <Loader title={strings.PLEASE_WAIT} loading={this.state.isLoading} />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={companyLogo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.title}>
                {strings.TITLE_CREATE_NEW_ACCOUNT}
              </Text>
              <Item rounded style={styles.inputItem}>
                <Input
                  style={styles.input}
                  placeholder={strings.NAME_PLACEHOLDER}
                  onChangeText={this.onNameChange}
                />
                <Icon name="person" style={styles.icon} />
              </Item>
              <Item rounded style={styles.inputItem}>
                <Input
                  style={styles.input}
                  placeholder={strings.USERNAME_PLACEHOLDER}
                  onChangeText={this.onUsernameChange}
                />
                <Icon name="person" style={styles.icon} />
              </Item>
              <Item rounded style={styles.inputItem}>
                <Input
                  style={styles.input}
                  placeholder={strings.PASSWORD_PLACEHOLDER}
                  secureTextEntry={true}
                  onChangeText={this.onPassowrdChange}
                />
                <Icon name="lock" style={styles.icon} />
              </Item>
              <Button
                rounded
                info
                block
                style={styles.button}
                onPress={this.register}
              >
                <Text>{strings.SEND}</Text>
              </Button>
              <Button
                rounded
                bordered
                dark
                block
                style={styles.button}
                onPress={this.backToLogin}
              >
                <Text>{strings.BACK_TO_LOGIN}</Text>
              </Button>
            </View>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
