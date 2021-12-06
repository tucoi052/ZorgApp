import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackContainer } from './stackHomeNavigation';
import { SettingStackContainer } from './stackSettingNavigation';
import { NotificationStackContainer } from './stackNotification';
import { RouteName } from 'constant';
import { Image } from 'react-native';
import { TabIcon } from 'assets';
import { sizes } from 'utils/sizes';
import { MyTabBar } from './MyTabBar';
import ScheduleScreen from 'screens/ScheduleScreen';
import HistoryScreen from 'screens/HistoryScreen';
const Tab = createBottomTabNavigator();

type Props = {};
export const TabContainer = (props: Props) => {
  return (
    <Tab.Navigator initialRouteName={RouteName.HOME} tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={RouteName.HOMETAB}
        options={{
          headerShown: false,
          tabBarLabel: 'Trang chủ',
        }}
        component={HomeStackContainer}
      />
      <Tab.Screen
        name={RouteName.SCHEDULETAB}
        options={({ route, navigation }) => ({
          headerShown: false,
          tabBarLabel: 'Lịch',
        })}
        component={ScheduleScreen}
      />
      <Tab.Screen
        name={RouteName.HISTORYTAB}
        options={({ route, navigation }) => ({
          tabBarLabel: 'Lịch sử',
        })}
        component={HistoryScreen}
      />
      <Tab.Screen
        name={RouteName.SETTINGTAB}
        options={({ route, navigation }) => ({
          tabBarLabel: 'Tài khoản',
          headerShown: false
        })}
        component={SettingStackContainer}
      />
    </Tab.Navigator>
  );
};
