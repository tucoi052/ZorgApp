import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Linking,
    View,
} from 'react-native';
import { ApplicationState } from 'store/configureAction';
import { TextInputUI, Layout, Label, Button } from 'components';
import { ImageAssets } from 'assets';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { useColor } from 'hooks';
import { useNavigation } from '@react-navigation/core'; 1
import { RouteName } from 'constant';
import Animated, { measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';

interface State {
    item: any,
    ChangeStatusSchedule: Function
}
type UIProps = State;

const ItemHistoryLayout = (props: UIProps) => {
    const color = useColor();
    const navigation = useNavigation();
    const [userType, setUserType] = useState(2);
    useEffect(() => {
        getType();
    }, [])

    const getType = async () => {
        let type = await AsyncStorage.getItem('userType') ?? 2;
        setUserType(type);
    }

    const labelButton = () => {
        if(!props.ChangeStatusSchedule) return 'Đã hoàn thành';
        if (userType == 3) return 'Hoàn thành';
        if (userType == 2) return 'Hủy tư vấn';
        if (userType == 1) return 'Đã hoàn thành';
    }

    const department = () => {
        if (props.item?.service == 0) return 'Nội tổng quát';
        if (props.item?.service == 1) return 'Tai, mũi, họng';
        if (props.item?.service == 2) return 'Nhi khoa';
        if (props.item?.service == 3) return 'Sức khỏe tâm thần & dinh dưỡng';
    }

    return (
        <Button disable={!props.ChangeStatusSchedule} color='#fff' borderRadius={10} shadow marginVertical={15} marginHorizontal={20} paddingHorizontal={20} paddingVertical={20}
            onPress={() => {
                Linking.openURL(props.item.room);
            }}>
            <Layout middle direction='row'>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 30 }}
                    source={ImageAssets.logo} />
                <Layout style={{ width: '75%' }}>
                    <Label bold>{props.item?.doctor?.full_name ?? 'Dr Nguyễn Thị Thúy'}</Label>
                    <Label marginVertical={5}>Dịch vụ khám: {department()}</Label>
                    <Label >Thời gian: {props.item?.hourStart} -  {props.item?.dateStart.split('-').reverse().join('/')}</Label>
                    <Label marginVertical={5}>Phương thức: Zoom</Label>
                    <Label numberOfLines={2}>{props.item?.room}</Label>
                </Layout>
            </Layout>
            <Button disable={!props.ChangeStatusSchedule} marginTop={10} padding={10} marginHorizontal={_screen_width * 0.25} borderRadius={10} centered middle color={userType == 3 || !props.ChangeStatusSchedule ? color?.BUTTON_COLOR : '#ff4056'}
                onPress={() => {
                    console.log(props.item?.status);
                    props.ChangeStatusSchedule(props.item?.id, userType == 3 ? 1 : 2);
                }}>
                <Label color='#fff'>{labelButton()}</Label>
            </Button>
        </Button>
    );
};
export default ItemHistoryLayout;
