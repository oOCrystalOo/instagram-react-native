import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import AddScreen from './main/Add';

const mapStateToProps   = ( store ) => ( {
  currentUser: store.userState.currentUser
} )
const mapDispatchProps  = ( dispatch ) => bindActionCreators ( { fetchUser }, dispatch );
const BottomTab         = createBottomTabNavigator();
const EmptyScreen       = () => {
  return ( null );
}

export class Main extends Component {
  constructor( props ) {
    super( props );
    this.state = {

    }
  }

  componentDidMount () {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    return (
      <BottomTab.Navigator initialRouteName="Feed">
        <BottomTab.Screen name="Feed" component={ FeedScreen } 
          options={ { 
            tabBarIcon: ( { colour, size } ) => (
              <Icons name="home" color={ colour } size={ size } />
            ),
            headerShown: false
          } } 
        />
        <BottomTab.Screen name="Add" component={ EmptyScreen } 
          listeners={ ( { navigation } ) => ( { 
            tabPress: event => { 
              event.preventDefault();
              navigation.navigate( 'AddContainer' );
            }
          } ) }
          options={ { 
            tabBarIcon: ( { colour, size } ) => (
              <Icons name="image-plus" color={ colour } size={ size } />
            )
          } } 
        />
        <BottomTab.Screen name="Profile" component={ ProfileScreen } 
          options={ { 
            tabBarIcon: ( { colour, size } ) => (
              <Icons name="account" color={ colour } size={ size } />
            ),
            headerShown: false
          } }
        />
      </BottomTab.Navigator>
    )
  }
}

export default connect( mapStateToProps, mapDispatchProps )(Main);
