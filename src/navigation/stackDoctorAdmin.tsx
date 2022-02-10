import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from 'screens/ScheduleScreen';
import { RouteName } from '../constant';
import { OPTS_COMMON } from './navigationConfig';
import DoctorAdmin from 'screens/DoctorAdmin';
import AddDoctor from 'screens/AddDoctor';
import AddAccount from 'screens/AddAccount';

const Stack = createStackNavigator();
type Props = {};

export const DoctorStackContainer = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...OPTS_COMMON,
      }}>
      <Stack.Screen
        name={RouteName.DOCTORTAB}
        component={DoctorAdmin}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={RouteName.ADDDOCTOR}
        component={AddDoctor}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={RouteName.ADD_ACCOUNT}
        component={AddAccount}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
