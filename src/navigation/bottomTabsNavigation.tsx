import React, { useEffect, useMemo, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackContainer } from './stackHomeNavigation';
import { SettingStackContainer } from './stackSettingNavigation';
import { DoctorStackContainer } from './stackDoctorAdmin';
import { RouteName } from 'constant';
import { Image, StatusBar } from 'react-native';
import { TabIcon } from 'assets';
import { sizes } from 'utils/sizes';
import { MyTabBar } from './MyTabBar';
import ScheduleScreen from 'screens/ScheduleScreen';
import HistoryScreen from 'screens/HistoryScreen';
import AsyncStorage from '@react-native-community/async-storage';
import UserAdmin from 'screens/UserAdmin';
import FeedbackAdmin from 'screens/FeedbackAdmin';
import DoctorAdmin from 'screens/DoctorAdmin';
import { useColor } from 'hooks';
const Tab = createBottomTabNavigator();

type Props = {};
export const TabContainer = (props: Props) => {
  const [userType, setUserType] = useState(2);
  const color = useColor();

  useEffect(() => {
    getType();
    StatusBar.setBackgroundColor(color?.PRIMARY_COLOR);
  }, [])

  const getType = async () => {
    let type = await AsyncStorage.getItem('userType') ?? 2;
    setUserType(type);
  }

  return (
    <Tab.Navigator initialRouteName={RouteName.HOMETAB} tabBar={props => <MyTabBar {...props} />}>
      <>
        {
          userType == 1 ?
            <>
              <Tab.Screen
                name={RouteName.USERTAB}
                options={({ route, navigation }) => ({
                  headerShown: false,
                  tabBarLabel: 'Người dùng',
                })}
                component={UserAdmin}
              />
              <Tab.Screen
                name={RouteName.DOCTORTAB}
                options={({ route, navigation }) => ({
                  tabBarLabel: 'Bác sĩ',
                  headerShown: false,
                })}
                component={DoctorStackContainer}
              />
              <Tab.Screen
                name={RouteName.FEEDBACKTAB}
                options={({ route, navigation }) => ({
                  tabBarLabel: 'Phản hồi',
                  headerShown: false,
                })}
                component={FeedbackAdmin}
              />
            </>
            :
            <>
              { userType == 2 && <Tab.Screen
                name={RouteName.HOMETAB}
                options={{
                  headerShown: false,
                  tabBarLabel: 'Trang chủ',
                }}
                component={HomeStackContainer}
              />}
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
                  headerShown: false,
                })}
                component={HistoryScreen}
              />
              {
                userType == 2 &&
                <Tab.Screen
                  name={RouteName.SETTINGTAB}
                  options={({ route, navigation }) => ({
                    tabBarLabel: 'Tài khoản',
                    headerShown: false
                  })}
                  component={SettingStackContainer}
                />}
            </>
        }
      </>
    </Tab.Navigator>
  );
};
