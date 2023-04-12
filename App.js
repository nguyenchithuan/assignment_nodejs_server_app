import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Settings/LoginScreen';
import RegisterScreen from './screens/Settings/RegisterScreen';
import UITab from './screens/UITab';
import ProductItem from './screens/products/ProductItem';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="ProductItem"
          component={ProductItem}
        />
        <Stack.Screen
          name="UITab"
          component={UITab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
