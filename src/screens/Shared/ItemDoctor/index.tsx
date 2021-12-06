import React, { useRef, useState } from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
    Platform,
    ScrollView,
    Image,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ContextAction } from 'store/context';
import { ActionCreators as AuthAction } from 'store/authenticate';
import { ApplicationState } from 'store/configureAction';
import { TextInputUI, Layout, Label, Button, ExpandAnimation } from 'components';
import { useFormik } from 'formik';
import { FormStage, Row, Stage } from 'models/form';
import { LoginUser } from 'models/auth';
import { ImageAssets } from 'assets';
import { sizes, _screen_height } from 'utils/sizes';
import { useColor } from 'hooks';
import { useNavigation } from '@react-navigation/core'; 1
import { RouteName } from 'constant';
import Animated, { measure, runOnUI, Transition, Transitioning, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface State {
    refItem: any,
    transition: any
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
                        height.value = measure(aref).height + 120;
                    })();
                }
                open.value = !open.value;
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
            <Animated.View style={[{
                overflow: "hidden",
            }, style]}>
                <View
                    ref={aref}
                    onLayout={({
                        nativeEvent: {
                            layout: { height: h },
                        },
                    }) => console.log({ h })}
                >
                    <Layout marginBottom={20}>
                        <Label bold marginBottom={10}>Thông tin bác sĩ:</Label>
                        <Label marginBottom={10}>Bác sĩ điều trị tại Bệnh viện Giao thông Vận tải Trung ương
Gần 5 năm kinh nghiệm chữa điều trị các bệnh Nội tổng quát - Hồi sức cấp cứu</Label>
                        <Button borderRadius={10} padding={10} color={color?.BUTTON_COLOR} middle marginHorizontal={_screen_height * 0.12}>
                            <Label color='#fff'>Chọn</Label>
                        </Button>
                    </Layout>
                </View>
            </Animated.View>
        </Button>
    );
};
export default ItemDoctorLayout;
