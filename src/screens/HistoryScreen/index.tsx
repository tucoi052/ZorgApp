import React from 'react';
import {View, Text} from 'react-native';
interface UIProps {
  navigation: any;
}
const HistoryScreen = (props: UIProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>History!</Text>
    </View>
  );
};
export default HistoryScreen;
