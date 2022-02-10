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
  forgotPassword: any;
  validationNewPasswordSchema: any;
  newPassword: any
}
type UIProps = State & typeof ContextAction & typeof AuthAction;

const NewPasswordLayout = (props: UIProps) => {
  const color = useColor();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused && props.forgotPassword?.otpDone == '3') {
      navigation.goBack();
    }
  },[props.forgotPassword])

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: props.validationNewPasswordSchema,
    initialValues: { ...props.newPassword },
    onSubmit: (values) => {
      delete props.forgotPassword.otpDone;
      delete props.forgotPassword.type;
      props.NewPassword({ ...props.forgotPassword, newPassword: values.password });
    },
  });
  const errorMessage = (fieldName: string) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName]?.toString();
    }
    return undefined;
  };
  const handle = () => {
    formik.handleSubmit();
  };
  const Form = () => {
    let form = props.forms?.find(e => e.stage === Stage.NEWPASSWORD);

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
          <Label marginBottom={30} bold centered size={sizes._19sdp}>Mật khẩu mới</Label>
          {Form()}
          <Button middle shadow marginTop={35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR}
            onPress={handle}>
            <Label color='#fff' bold>Thay đổi</Label>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  forms: state.AuthenticateState.forms,
  forgotPassword: state.AuthenticateState.forgotPassword,
  newPassword: state.AuthenticateState.newPassword,
  validationNewPasswordSchema: state.AuthenticateState.validationNewPasswordSchema
});
const mapDispatchToProps = {
  ...AuthAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NewPasswordLayout as any);
