import { ImageAssets } from 'assets';
import { Layout } from 'components';
import { useColor } from 'hooks';
import React from 'react';
import {Image, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ItemHistoryLayout from 'screens/Shared/ItemHistory';
import { _screen_height } from 'utils/sizes';
interface UIProps {
  navigation: any;
}
const ScheduleScreen = (props: UIProps) => {
  const color = useColor();



  return (
    <Layout flex color={color?.PRIMARY_COLOR} >
      <Layout middle>
        <Image
          style={{ marginTop: 20 }}
          source={ImageAssets.logo} />
      </Layout>
      <ScrollView>
      <ItemHistoryLayout />
      </ScrollView>
    </Layout>
  );
};
export default ScheduleScreen;
