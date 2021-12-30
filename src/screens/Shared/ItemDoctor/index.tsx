import React, { useRef, useState } from 'react';
import {
    Text,
    Image,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ContextAction } from 'store/context';
import { ActionCreators as AuthAction } from 'store/authenticate';
import { ApplicationState } from 'store/configureAction';
import { TextInputUI, Layout, Label, Button } from 'components';
import { useFormik } from 'formik';
import { FormStage, Row, Stage } from 'models/form';
import { LoginUser } from 'models/auth';
import { ImageAssets } from 'assets';
import { sizes, _screen_height } from 'utils/sizes';
import { useColor } from 'hooks';
import { useNavigation } from '@react-navigation/core'; 1
import { RouteName } from 'constant';
import Animated, { measure, runOnUI, Transition, Transitioning, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Doctor } from 'models/doctor';

interface State {
    item: Doctor,
    id: string
}
type UIProps = State;

const ItemDoctorLayout = (props: UIProps) => {
    const color = useColor();
    const navigation = useNavigation();
    const aref = useAnimatedRef<View>();
    const open = useSharedValue(false);
    const progress = useDerivedValue(() =>
        open.value ? withSpring(1) : withTiming(0)
    );
    const height = useSharedValue(0);

    const style = useAnimatedStyle(() => ({
        height: height.value * progress.value + 1,
        opacity: progress.value === 0 ? 0 : 1,
    }));

    return (
        <Button color='#fff' borderRadius={10} shadow marginVertical={15} marginHorizontal={20} paddingHorizontal={20}
            onPress={() => {
                if (height.value === 0) {
                    runOnUI(() => {
                        "worklet";
                        height.value = measure(aref).height * 3 + 20;
                    })();
                }
                open.value = !open.value;
            }}>
            <Layout middle direction='row'>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 30 }}
                    source={ImageAssets.logo} />
                <Layout style={{ width: '70%' }}>
                    <Label bold>{props.item?.fullName}</Label>
                    <Label marginVertical={5}>{props.item?.hospital}</Label>
                    {/* <Label numberOfLines={2}>Bệnh viện Giao thông vận tải Trung Ương 23</Label> */}
                </Layout>
            </Layout>
            <Animated.View style={[{
                overflow: "hidden",
            }, style]}>
                <View
                    ref={aref}
                >
                    <Label bold marginBottom={10}>Thông tin bác sĩ:</Label>
                    <Label marginBottom={10}>{props.item.description}</Label>
                    <Label  style={{alignSelf: 'flex-end'}} marginBottom={10}>Lượt lựa chọn: {props.item.quantityChoose}</Label>
                    <Button marginTop={10} borderRadius={10} padding={10} color={color?.BUTTON_COLOR} middle marginHorizontal={_screen_height * 0.12}
                    onPress={()=> navigation.navigate(RouteName.BOOK_DOCTOR, {item: props.item, id: props.id})}>
                        <Label color='#fff'>Chọn</Label>
                    </Button>
                </View>
            </Animated.View>
        </Button>
    );
};
export default ItemDoctorLayout;
