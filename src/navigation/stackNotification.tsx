import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from 'screens/ScheduleScreen';
import { RouteName } from '../constant';
import { OPTS_COMMON } from './navigationConfig';

const Stack = createStackNavigator();
type Props = {};

export const NotificationStackContainer = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...OPTS_COMMON,
      }}>
      <Stack.Screen
        name={RouteName.NOTIFICATION}
        component={ScheduleScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
