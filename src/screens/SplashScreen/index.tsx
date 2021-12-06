import React from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
    Platform,
    ScrollView,
    Image,
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
import { useNavigation } from '@react-navigation/core';
import { RouteName } from 'constant';

interface State {
    forms?: FormStage[];
    user: LoginUser;
    validationSchema: any;
}
type UIProps = State & typeof ContextAction & typeof AuthAction;

const SplashScreen = (props: UIProps) => {
    const color = useColor();
    const navigation = useNavigation();
    return (
        <Layout flex middle color={color?.PRIMARY_COLOR}>
            <Image
                style={{ marginTop: 20 }}
                source={ImageAssets.logo} />
            <Label size={sizes._21sdp} color='#47599B'>Love's foundation is care.</Label>

            {/* <Button shadow marginTop={_screen_height * 0.35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR}
                onPress={() => {
                    // props.FieldChange('isLoggedIn', true)
                    navigation.navigate(RouteName.SIGN_IN)
                }}>
                <Label color={color?.WHITE_COLOR}>Bạn đã có tài khoản? <Label bold>Đăng nhập</Label> </Label>
            </Button>
            <Button shadow marginTop={25} borderRadius={10} padding={15} color={color?.BUTTON_COLOR}
                onPress={() => navigation.navigate(RouteName.SIGN_UP)}>
                <Label color={color?.WHITE_COLOR}>Bạn chưa có tài khoản? <Label bold>Tạo tài khoản</Label> </Label>
            </Button> */}
        </Layout>
    );
};
const mapStateToProps = (state: ApplicationState) => ({
});
const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SplashScreen as any);
