import { AppRegistry } from 'react-native';
import App from './App'; // Make sure this path correctly points to your main App component
import { name as appName } from './app.json'; // Make sure this points to your app's name as defined in app.json

AppRegistry.registerComponent(appName, () => App);
