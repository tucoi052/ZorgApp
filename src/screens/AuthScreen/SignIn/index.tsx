import React, { useEffect } from 'react';
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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RouteName } from 'constant';

interface State {
  forms?: FormStage[];
  user: LoginUser;
  validationSchema: any;
  route: any
}
type UIProps = State & typeof AuthAction;

const SignInLayout = (props: UIProps) => {
  const color = useColor();
  const navigation = useNavigation();
  const isAdmin = props.route?.params?.isAdmin ?? false;
  const isFocused = useIsFocused()

  useEffect(()=>{
    if(isFocused) {
      props.FieldChange('forgotPassword', {
        email: '',
        type: 2
      })
    }
  },[isFocused])

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: props.validationSchema,
    initialValues: { ...props.user },
    onSubmit: (values: LoginUser) => {
      if (isAdmin)
        props.LoginAdmin(values.email, values.password);
      else
        props.Login(values.email.trim(), values.password.trim());
    },
  });
  const errorMessage = (fieldName: string) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName]?.toString();
    }
    return undefined;
  };
  const handleLogin = () => {
    formik.handleSubmit();
  };
  const Form = () => {
    let form = props.forms?.find(e => e.stage === Stage.LOGIN);

    if (form) {
      return (
        <Layout>
          {form?.rows.map((r: Row, i: number) => (
            <Layout key={i}>
              {r.controls.map((c, index) => (
                <TextInputUI
                  key={index}
                  placeholder={c.placeholder}
                  uistyle={{ paddingTop: sizes._15sdp }}
                  type={c.type}
                  keyboardType={c.keyboardType}
                  layoutstyle={{ backgroundColor: '#fff' }}
                  contentstyle={{ marginHorizontal: 10 }}
                  errorMessage={errorMessage(c.fieldName)}
                  textValue={formik.values[c.fieldName]}
                  onChangeText={(text: string) => {
                    formik.setFieldValue(c.fieldName, text);
                  }}
                />
              ))}
            </Layout>
          ))}
        </Layout>
      );
    }
    return <></>;
  }

  return (
    <Layout centered paddingHorizontal={40} flex color={color?.PRIMARY_COLOR}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        enabled={true}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <Label marginBottom={30} bold centered size={sizes._19sdp}>Đăng Nhập</Label>
          {Form()}
          <Button middle shadow marginTop={35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR}
            onPress={handleLogin}>
            <Label color='#fff' bold>Đăng nhập</Label>
          </Button>
          {!isAdmin && <Button marginTop={10} onPress={() => navigation.navigate(RouteName.FORGOTPASSWORD)}>
            <Label>Bạn quên mật khẩu ?</Label>
          </Button>}
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  forms: state.AuthenticateState.forms,
  user: state.AuthenticateState.user,
  validationSchema: state.AuthenticateState.validationSchema
});
const mapDispatchToProps = {
  ...AuthAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignInLayout as any);
