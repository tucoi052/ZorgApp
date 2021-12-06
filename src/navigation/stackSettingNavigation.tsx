import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLayout from 'screens/SettingScreen/Setting';
import { RouteName } from '../constant';
import { OPTS_COMMON } from './navigationConfig';
import { SettingScreen } from 'screens/SettingScreen';

const Stack = createStackNavigator();
type Props = {};

export const SettingStackContainer = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...OPTS_COMMON,
      }}>
      <Stack.Screen
        name={RouteName.SETTING}
        component={SettingScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
