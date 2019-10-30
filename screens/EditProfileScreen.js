import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Input,
  Item,
  Button,
  Text,
  Toast,
  View,
  Form,
  Label,
} from 'native-base';
import { withChatContext } from '../context/ChatProvider';
import { strings, axios, auth, urls } from '../config';
import { Header, Avatar } from '../components';
import styles from './styles/editProfile';
import * as ImagePicker from 'expo-image-picker';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    let user = props.chat.account;
    this.state = {
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    };
  }

  onNameChange = name => this.setState({ name });

  onAboutChange = about => this.setState({ about });

  handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ avatar: result });
    }
  };

  validate() {
    Keyboard.dismiss();
    if (!this.state.name) {
      Toast.show({ text: strings.NAME_REQUIRED, type: 'danger' });
      return false;
    }
    if (!this.state.about) {
      Toast.show({ text: strings.ABOUT_REQUIRED, type: 'danger' });
      return false;
    }
    return true;
  }

  send = async () => {
    if (!this.validate()) return;
    let { name, about, avatar } = this.state;
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    if (avatar instanceof Object) {
      let fileType = avatar.uri.split('.').pop();
      data.append('avatar', {
        uri: avatar.uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    try {
      axios.defaults.headers.common.Authorization = await auth.getToken();
      await axios.post(urls.UPDATE_PROFILE, data);
      Toast.show({ text: strings.PROFILE_UPDATED, type: 'success' });
    } catch (e) {
      Toast.show({ text: e.response.data.message, type: 'danger' });
    }
  };

  logout = async () => {
    await auth.logout();
    this.props.chat.logout();
    this.props.navigation.navigate('Login');
  };

  navToPassword = () => this.props.navigation.navigate('Password');

  render() {
    return (
      <Container>
        <Header title={strings.TITLE_MY_ACCOUNT} />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={this.handleChoosePhoto}>
                <Avatar type="profile" source={this.state.avatar} />
              </TouchableOpacity>
            </View>
            <Form style={styles.form}>
              <Item style={styles.inputItem} floatingLabel>
                <Label>{strings.NAME_PLACEHOLDER}</Label>
                <Input
                  style={styles.input}
                  value={this.state.name}
                  onChangeText={this.onNameChange}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label>{strings.ABOUT_PLACEHOLDER}</Label>
                <Input
                  style={styles.input}
                  value={this.state.about}
                  onChangeText={this.onAboutChange}
                />
              </Item>
              <Button
                rounded
                info
                block
                style={styles.button}
                onPress={this.send}
              >
                <Text>{strings.SAVE}</Text>
              </Button>
              <Button
                rounded
                bordered
                dark
                block
                style={styles.button}
                onPress={this.navToPassword}
              >
                <Text>{strings.CHANGE_PASSWORD}</Text>
              </Button>
              <Button
                rounded
                bordered
                dark
                block
                style={styles.button}
                onPress={() => this.logout()}
              >
                <Text>{strings.LOGOUT}</Text>
              </Button>
            </Form>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default withChatContext(EditProfileScreen);
