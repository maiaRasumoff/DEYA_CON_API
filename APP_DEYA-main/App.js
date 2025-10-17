
import * as React from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import PopupDetailScreen from './PopupDetailScreen';
import EstilosScreen from './EstilosScreen';
import BarriosScreen from './BarriosScreen';
import PersonalizacionExitosaScreen from './PersonalizacionExitosaScreen';
import { registerForPushNotificationsAsync } from './src/utils/notifications';

const Stack = createStackNavigator();

// Configure foreground notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) setExpoPushToken(token);
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EstilosScreen" component={EstilosScreen} />
        <Stack.Screen name="BarriosScreen" component={BarriosScreen} />
        <Stack.Screen name="PersonalizacionExitosaScreen" component={PersonalizacionExitosaScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PopupDetailScreen" component={PopupDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

