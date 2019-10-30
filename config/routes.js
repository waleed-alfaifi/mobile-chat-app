import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  Home,
  Login,
  Register,
  Chat,
  Profile,
  EditProfile,
  Password,
} from '../screens';

let config = { headerMode: 'none' };

export default createAppContainer(
  createSwitchNavigator(
    {
      Guest: createStackNavigator(
        {
          Login,
          Register,
        },
        config
      ),
      Auth: createStackNavigator(
        {
          Login,
          Home,
          Chat,
          Profile,
          EditProfile,
          Password,
        },
        config
      ),
    },
    config
  )
);
