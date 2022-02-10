import React, { useEffect, useRef, useState } from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ContextAction } from 'store/context';
import { ActionCreators as AuthAction } from 'store/authenticate';
import { ApplicationState } from 'store/configureAction';
import { TextInputUI, Layout, Label, Button } from 'components';
import { useFormik } from 'formik';
import { FormStage, Row, Stage, TypeField } from 'models/form';
import { Register } from 'models/auth';
import { Image } from 'react-native';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { useColor, useKeyboard } from 'hooks';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { IconImage } from 'assets';
import { RouteName } from 'constant';

interface State {
    forms?: FormStage[];
    forgotPassword: any;
    validationForgotSchema: any;
    navigation: any
}
type UIProps = State & typeof ContextAction & typeof AuthAction;

const OTPLayout = (props: UIProps) => {
    const color = useColor();
    const navigation = useNavigation();
    const inputRef1 = useRef<any>(null);
    const inputRef2 = useRef<any>(null);
    const inputRef3 = useRef<any>(null);
    const inputRef4 = useRef<any>(null);
    const inputRef5 = useRef<any>(null);
    const inputRef6 = useRef<any>(null);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(120);
    const [isReadyCount, setReadyCount] = useState(true);

    useEffect(() => {
        inputRef1.current?.focus();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            if (isReadyCount) {
                setCountdown(countdown - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isReadyCount, countdown]);

    useEffect(() => {
        if (props.forgotPassword && props.forgotPassword?.otpDone == '2') {
            console.log('cc');
            props.navigation.replace(RouteName.NEW_PASSWORD);
        }
    }, [props.forgotPassword])

    useEffect(() => {
        if (countdown === 0) {
            setReadyCount(false);
            // props.ForgotPassword(props.forgotPassword);
        }
    }, [countdown]);

    useEffect(() => {
        if (props.forgotPassword && props.forgotPassword?.otp == '') {
            setCountdown(10);
            setReadyCount(true);
        }
    }, [props.forgotPassword])

    const convertTime = (timeSecond: number) => {
        let pad = function (num: number, size: number) {
            return ('000' + num).slice(size * -1);
        };
        const minutes = Math.floor(timeSecond / 60) % 60;
        const seconds = Math.floor(timeSecond - minutes * 60);
        return pad(minutes, 2) + ':' + pad(seconds, 2);
    };

    const getRefInput = (index: number) => {
        return [
            inputRef1,
            inputRef2,
            inputRef3,
            inputRef4,
            inputRef5,
            inputRef6,
        ].find((item, idx) => idx === index);
    };

    const onChangeRefCode = (indexInput: number, value: string) => {
        otp[indexInput] = value;
        setOtp([...otp]);
        if (indexInput === 0 && value !== '') {
            inputRef2.current?.focus();
        } else if (indexInput === 1 && value !== '') {
            inputRef3.current?.focus();
        } else if (indexInput === 2 && value !== '') {
            inputRef4.current?.focus();
        } else if (indexInput === 3 && value !== '') {
            inputRef5.current?.focus();
        } else if (indexInput === 4 && value !== '') {
            inputRef6.current?.focus();
        } else if (indexInput === 5 && value !== '') { }
        // if (value !== '') {
        //     otp[indexInput] = value;
        //     setOtp([...otp]);
        // }
    };

    const onDeleteRefCode = (indexInput: number) => {
        otp[indexInput] = '';
        setOtp([...otp]);
        if (indexInput === 5) {
            inputRef5.current?.focus();
        } else if (indexInput === 4) {
            inputRef4.current?.focus();
        } else if (indexInput === 3) {
            inputRef3.current?.focus();
        } else if (indexInput === 2) {
            inputRef2.current?.focus();
        } else if (indexInput === 1) {
            inputRef1.current?.focus();
        } else if (indexInput === 0) {
            //   inputRef1.current?.focus();
        }
    };

    const isDisable = () => {
        let otpString = otp.reduce((pre, cur) => pre + cur);
        if (otpString.length == 6) return false;
        return true;
    }


    return (
        <Layout paddingHorizontal={40} flex color={color?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                enabled={true}>
                <ScrollView>

                    <Label marginBottom={10} bold size={sizes._19sdp}>Nhập mã pin</Label>
                    <Label >Mật mã PIN 6 số sẽ đươc gửi tới email của bạn</Label>
                    <Label marginBottom={40}>Vui lòng nhập vào bên dưới.</Label>
                    <Layout horizontal justifyContent='space-around'>
                        {
                            Array(6).fill(0).map((e, index) => (
                                <Layout borderRadius={10} paddingVertical={15} paddingHorizontal={20} color='#fff'>
                                    <TextInput
                                        style={{ width: 12, height: 15, textAlign: 'center' }}
                                        maxLength={1}
                                        keyboardType="numeric"
                                        ref={getRefInput(index)}
                                        value={otp[index]}
                                        onKeyPress={({ nativeEvent }) => {
                                            nativeEvent.key === 'Backspace' && onDeleteRefCode(index);
                                        }}
                                        selectTextOnFocus
                                        selectionColor='#fff'
                                        // selectionState={undefined}
                                        onChangeText={(value) => {
                                            onChangeRefCode(index, value);
                                        }} />
                                </Layout>
                            ))
                        }
                    </Layout>
                    <Layout horizontal marginTop={30}>
                        <Label>
                            Gửi lại mã sau: <Label color="#FF0000">{convertTime(countdown)}</Label>
                        </Label>
                        {!isReadyCount && <Button onPress={() => {
                            delete props.forgotPassword.otp;
                            props.ForgotPassword(props.forgotPassword);

                        }}>
                            <Label color={color?.BUTTON_COLOR} marginLeft={10}>Gửi lại mã</Label>
                        </Button>}
                    </Layout>
                    {/* <Button middle shadow marginTop={35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR}
                    onPress={() => {

                    }}>
                    <Label color='#fff' bold>Lấy lại mật khẩu</Label>
                </Button> */}
                    
                </ScrollView>
                <Button padding={10} direction={'row'} middle style={{ position: 'absolute', bottom: 80, right: 0 }}
                        onPress={() => {
                            props.forgotPassword['otp'] = otp.reduce((pre, cur) => pre + cur);
                            delete props.forgotPassword.otpDone;
                            props.VerifyOtp(props.forgotPassword);
                        }}
                        disable={isDisable()}
                    >
                        <Label bold={!isDisable()} size={sizes._14sdp} marginRight={10}>Tiếp theo</Label>
                        <Image source={IconImage.arrowLeft} style={{ width: 17, height: 19, resizeMode: 'contain' }} />
                    </Button>
            </KeyboardAvoidingView>
        </Layout>
    );
};
const mapStateToProps = (state: ApplicationState) => ({
    forgotPassword: state.AuthenticateState.forgotPassword,
});
const mapDispatchToProps = {
    ...AuthAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(OTPLayout as any);
