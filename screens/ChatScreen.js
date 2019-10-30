import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Container, Icon } from 'native-base';
import {
  GiftedAvatar,
  InputToolbar,
  GiftedChat,
} from 'react-native-gifted-chat';
import { withChatContext } from '../context/ChatProvider';
import styles from './styles/chat';
import { ChatHeader } from '../components';
import { strings, moment } from '../config';

class ChatScreen extends Component {
  state = {
    message: '',
    lastType: false,
  };

  onBackClick = () => {
    this.props.navigation.goBack(null);
  };

  onProfileClick = () => {
    this.props.navigation.navigate('Profile');
  };

  onMessageChange = message => {
    this.setState({ message });
    if (!this.state.lastType || moment() - this.state.lastType > 2000) {
      this.setState({ lastType: moment() });
      this.props.chat.sendType();
    }
  };

  onSend = () => {
    let content = this.state.message.trim();
    if (!content) return;
    this.setState({ message: '', lastType: false });
    this.props.chat.sendMessage(content);
  };

  componentWillUnmount() {
    this.props.chat.setCurrentContact({});
  }

  render() {
    const { contact, account, status } = this.props.chat;

    let messages = this.props.chat.messages.filter(
      e => e.sender === contact.id || e.receiver === contact.id
    );
    return (
      <Container>
        <ChatHeader
          contact={contact}
          onBack={this.onBackClick}
          onProfile={this.onProfileClick}
          status={status()}
        />
        <GiftedChat
          user={{ _id: account.id }}
          text={this.state.message}
          onInputTextChanged={this.onMessageChange}
          messages={messages.reverse()}
          renderInputToolbar={this.renderInputToolbar}
          renderAvatar={null}
        />
        <KeyboardAvoidingView behavior="padding" enabled />
      </Container>
    );
  }

  renderInputToolbar = props => {
    props.placeholder = strings.WRITE_YOUR_MESSAGE;
    props.textInputStyle = styles.input;
    props.renderSend = this.renderSend;
    return <InputToolbar {...props} />;
  };

  renderSend = () => (
    <Icon name="paper-plane" onPress={this.onSend} style={styles.send} />
  );
}

export default withChatContext(ChatScreen);
