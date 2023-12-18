import { auth, db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { USER_STATE_CHANGE } from '../constants';

export function fetchUser() {
  return ( dispatch => {
    getDoc( doc( db, 'users', auth.currentUser.uid ) ).then( snapshot => {
      if ( snapshot.exists() ) {
        dispatch( { type: USER_STATE_CHANGE, currentUser: snapshot.data() } );
      } else {
        console.log( 'snapshot does not exist.' );
      }
    } );    
  } );
}