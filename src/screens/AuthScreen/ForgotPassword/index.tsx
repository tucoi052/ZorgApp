import React, { useEffect } from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { RouteName } from 'constant';

interface State {
    forms?: FormStage[];
    forgotPassword: any;
    validationForgotSchema: any;
    navigation: any
}
type UIProps = State & typeof ContextAction & typeof AuthAction;

const ForgotPasswordLayout = (props: UIProps) => {
    const color = useColor();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: props.validationForgotSchema,
        initialValues: { ...props.forgotPassword },
        onSubmit: (values) => {
            props.ForgotPassword(values);
        },
    });
    const errorMessage = (fieldName: string) => {
        if (formik.touched[fieldName] && formik.errors[fieldName]) {
            return formik.errors[fieldName]?.toString();
        }
        return undefined;
    };
    const handleForgot = () => {
        formik.handleSubmit();
    };

    useEffect(() => {
        if (isFocused && props.forgotPassword && props.forgotPassword?.otpDone == '1') {
            props.navigation.replace(RouteName.OTP);
        }
    }, [props.forgotPassword])

    return (
        <Layout paddingHorizontal={40} flex color={color?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                enabled={true}>
                <Label marginBottom={40} bold centered size={sizes._19sdp}>Quên mật khẩu</Label>
                <TextInputUI
                    placeholder={'Email'}
                    uistyle={{ paddingTop: sizes._15sdp }}
                    type={TypeField.TEXT}
                    keyboardType={'email-address'}
                    layoutstyle={{ backgroundColor: '#fff' }}
                    contentstyle={{ marginHorizontal: 10 }}
                    errorMessage={errorMessage('email')}
                    textValue={formik.values['email']}
                    onChangeText={(text: string) => {
                        formik.setFieldValue('email', text);
                    }}
                />
                <Button middle shadow marginTop={35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR}
                    onPress={handleForgot}>
                    <Label color='#fff' bold>Lấy lại mật khẩu</Label>
                </Button>
            </KeyboardAvoidingView>
        </Layout>
    );
};
const mapStateToProps = (state: ApplicationState) => ({
    forgotPassword: state.AuthenticateState.forgotPassword,
    validationForgotSchema: state.AuthenticateState.validationForgotSchema,
});
const mapDispatchToProps = {
    ...AuthAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ForgotPasswordLayout as any);
