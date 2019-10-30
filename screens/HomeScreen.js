import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { strings, auth } from '../config';
import { HomeHeader, Contact } from '../components';
import { withChatContext } from '../context/ChatProvider';

class HomeScreen extends Component {
  state = {
    search: '',
  };

  componentDidMount() {
    this._init();
  }

  _init = async () => {
    let socket = await this.props.chat.connect();
    socket.on('error', this.onSocketError);
    this.props.chat.loadUserAccount();
  };

  onSearchChange = search => this.setState({ search });

  setMessageAndCounter = contact => {
    let messages = this.props.chat.messages.filter(
      e => e.sender === contact.id || e.receiver === contact.id
    );
    contact.lastMessage = messages[messages.length - 1];
    contact.counter = messages.filter(
      e => !e.seen && e.sender === contact.id
    ).length;
    return contact;
  };

  onContactClick = contact => {
    this.props.chat.setCurrentContact(contact);
    this.props.navigation.navigate('Chat');
  };

  onSocketError = async error => {
    console.log('Error ', error);
    if (error === 'Authorization failed') {
      await auth.logout();
      this.props.navigation.navigate('Login');
    }
  };

  onMenuClick = () => this.props.navigation.navigate('EditProfile');

  rednerContact = (contact, i) => {
    if (!contact.name.includes(this.state.search)) return null;
    contact = this.setMessageAndCounter(contact);
    return <Contact key={i} contact={contact} onClick={this.onContactClick} />;
  };

  render() {
    return (
      <Container>
        <HomeHeader
          title={strings.TITLE_CONTACTS}
          onSearchChange={this.onSearchChange}
          onMenuClick={this.onMenuClick}
        />
        <Content>
          <List>{this.props.chat.contacts.map(this.rednerContact)}</List>
        </Content>
      </Container>
    );
  }
}

export default withChatContext(HomeScreen);
