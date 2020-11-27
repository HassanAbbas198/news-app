import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';

import NewsFeedScreen from '../screens/NewsFeedScreen';

const NewsStackNavigator = createStackNavigator();
const NewsNavigator = () => {
  return (
    <NewsStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}>
      <NewsStackNavigator.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{ headerTitle: 'News Feed' }}
      />
    </NewsStackNavigator.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <NewsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
