import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteName } from '../constant';
import { OPTS_COMMON } from './navigationConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { HomeScreen, SelectDoctorScreen } from 'screens/HomeScreen';

const Stack = createStackNavigator();
type Props = {};

export const HomeStackContainer = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...OPTS_COMMON,
      }}>
      <Stack.Screen
        name={RouteName.HOME}
        component={HomeScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={RouteName.SELECT_DOCTOR}
        component={SelectDoctorScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
