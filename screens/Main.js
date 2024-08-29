import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screen Components
const HomeScreen = () => (
  <View>
    <Text>Welcome to the Home Page</Text>
  </View>
);

const AlertScreen = () => (
  <View>
    <Text>Alerts Page</Text>
  </View>
);

const SchemesScreen = () => (
  <View>
    <Text>Schemes Page</Text>
  </View>
);

const AboutScreen = () => (
  <View>
    <Text>About Page</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Alert':
              iconName = 'notifications';
              break;
            case 'Schemes':
              iconName = 'work';
              break;
            case 'About':
              iconName = 'info';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50', // Green theme color for active tab
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alert" component={AlertScreen} />
      <Tab.Screen name="Schemes" component={SchemesScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}
