import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase, auth } from './utils/firebase';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import routeReducer from './redux/reducers';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';

const store = configureStore( { 
  reducer: routeReducer
} );
const Stack = createStackNavigator();

import React, { Component } from 'react'

export class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged( ( user ) => {
      if ( user ) {
        this.setState( { 
          loggedIn: true,
          loaded: true
        } )
      } else {
        this.setState( { 
          loggedIn: false,
          loaded: true
        } )
      }
    } );
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if ( loaded ) {
      if ( loggedIn ) {
        return (
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={ MainScreen } options={ { headerShown: false } } />
                <Stack.Screen name="AddContainer" component={ AddScreen } options={ { headerShown: false } } />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        )
      } else {
        return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen name="Landing" component={ LandingScreen } options={ { headerShown: false } } />
              <Stack.Screen name="Register" component={ RegisterScreen } />
              <Stack.Screen name="Login" component={ LoginScreen } />
            </Stack.Navigator>
          </NavigationContainer>
        )
      }
    } else {
      return (
        <View style={ { flex: 1, justifyContent: 'center' } }>
          <Text>Loading...</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;