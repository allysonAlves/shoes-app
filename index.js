import { registerRootComponent } from 'expo';
import firebase from '@react-native-firebase/app'

import App from './App';

export const initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp();
    }
};

initializeFirebase();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
