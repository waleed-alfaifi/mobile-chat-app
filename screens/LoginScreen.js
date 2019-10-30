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
import { Loader } from '../components';
import styles from './styles/auth';
import companyLogo from '../assets/images/logo.png';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: true,
    };

    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const authenticated = await auth.auth();
    this.setState({ isLoading: false });

    if (authenticated) {
      this.props.navigation.navigate('Home');
    }
  };

  onUsernameChange = username => this.setState({ username });

  onPassowrdChange = password => this.setState({ password });

  validate = () => {
    const { username, password } = this.state;
    Keyboard.dismiss();

    if (!username) {
      Toast.show({ text: strings.USERNAME_REQUIRED, type: 'danger' });
      return false;
    }

    if (!password) {
      Toast.show({ text: strings.PASSWORD_REQUIRED, type: 'danger' });
      return false;
    }

    return true;
  };

  login = async () => {
    if (!this.validate()) return;

    const { username, password } = this.state;
    const data = { username, password };

    try {
      this.setState({ isLoading: true });
      const response = await Axios.post(urls.AUTH, data);

      auth.setUser(response.data);
      this.setState({ isLoading: false });
      this.props.navigation.navigate('Home');
    } catch (error) {
      this.setState({ isLoading: false });
      Toast.show({ text: error.response.data.error, type: 'danger' });
    }
  };

  navToRegister = () => this.props.navigation.navigate('Register');

  render() {
    const { isLoading } = this.state;
    return (
      <Container>
        <Loader title={strings.PLEASE_WAIT} loading={isLoading} />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={companyLogo}
                resizeMethod="auto"
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.title}>{strings.LOGIN}</Text>
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
                onPress={this.login}
              >
                <Text>{strings.LOGIN}</Text>
              </Button>
              <Button
                rounded
                bordered
                dark
                block
                style={styles.button}
                onPress={this.navToRegister}
              >
                <Text>{strings.CREATE_NEW_ACCOUNT}</Text>
              </Button>
            </View>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
