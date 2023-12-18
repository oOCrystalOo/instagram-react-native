import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword  } from 'firebase/auth';

export default class Login extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      email   : '',
      password: ''
    }
    this.onLogin = this.onLogin.bind( this );
  }

  onLogin = () => {
    const { email, password } = this.state;
    signInWithEmailAndPassword( auth, email, password )
      .then( ( result ) => {
        console.log( result );
      } )
      .catch( ( error ) => {
        console.log( error );
      } );
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Email" onChangeText={ ( email ) => { this.setState( { email } ) } } />
        <TextInput placeholder="Password" secureTextEntry={ true } onChangeText={ ( password ) => { this.setState( { password } ) } } />
        <Button onPress={ () => { this.onLogin() } } title="Login" />
      </View>
    )
  }
}
