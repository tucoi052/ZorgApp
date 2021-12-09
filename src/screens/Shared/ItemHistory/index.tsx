import React, { useRef, useState } from 'react';
import {
    Image,
    View,
} from 'react-native';
import { ApplicationState } from 'store/configureAction';
import { TextInputUI, Layout, Label, Button } from 'components';
import { ImageAssets } from 'assets';
import { sizes, _screen_height } from 'utils/sizes';
import { useColor } from 'hooks';
import { useNavigation } from '@react-navigation/core'; 1
import { RouteName } from 'constant';
import Animated, { measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface State {
}
type UIProps = State;

const ItemHistoryLayout = (props: UIProps) => {
    const color = useColor();
    const navigation = useNavigation();

    return (
        <Button color='#fff' borderRadius={10} shadow marginVertical={15} marginHorizontal={20} paddingHorizontal={20}
            onPress={() => {
                
            }}>
            <Layout middle direction='row'>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 30 }}
                    source={ImageAssets.logo} />
                <Layout style={{ width: '75%' }}>
                    <Label bold>Dr Nguyễn Văn A</Label>
                    <Label marginVertical={5}>Bác sĩ nội khoa</Label>
                    <Label numberOfLines={2}>Bệnh viện Giao thông vận tải Trung Ương 23</Label>
                </Layout>
            </Layout>
            
        </Button>
    );
};
export default ItemHistoryLayout;
