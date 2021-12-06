import React from 'react';
import {View, Text} from 'react-native';
interface UIProps {
  navigation: any;
}
const ScheduleScreen = (props: UIProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Schedule!</Text>
    </View>
  );
};
export default ScheduleScreen;
