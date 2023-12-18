import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword  } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

export default class Register extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      email   : '',
      password: '',
      name    : '',

    }
    this.onSignUp = this.onSignUp.bind( this );
  }

  onSignUp = () => {
    const { email, password, name } = this.state;
    createUserWithEmailAndPassword( auth, email, password )
      .then( async result => {
        const userRef = doc( db, 'users', auth.currentUser.uid );
        await setDoc( userRef, { name: name, email: email } ); // Doesn't return anything
      } )
      .catch( ( error ) => {
        console.log( error );
      } );
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Name" onChangeText={ ( name ) => { this.setState( { name } ) } } />
        <TextInput placeholder="Email" onChangeText={ ( email ) => { this.setState( { email } ) } } />
        <TextInput placeholder="Password" secureTextEntry={ true } onChangeText={ ( password ) => { this.setState( { password } ) } } />
        <Button onPress={ () => { this.onSignUp() } } title="Sign Up" />
      </View>
    )
  }
}
