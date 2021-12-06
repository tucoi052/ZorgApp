import React from 'react';
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
import { FormStage, Row, Stage } from 'models/form';
import { Register } from 'models/auth';
import { Image } from 'react-native';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { useColor, useKeyboard } from 'hooks';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';

interface State {
  forms?: FormStage[];
  register: Register;
  validationSignUpSchema: any;
}
type UIProps = State & typeof ContextAction & typeof AuthAction;

const SignUpLayout = (props: UIProps) => {
  const color = useColor();
  const navigation = useNavigation();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: props.validationSignUpSchema,
    initialValues: { ...props.register },
    onSubmit: (values: any) => {
      props.Register(values);
    },
  });
  const errorMessage = (fieldName: string) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName]?.toString();
    }
    return undefined;
  };
  const handleSignup = () => {
    formik.handleSubmit();
  };
  const Form = () => {
    let form = props.forms?.find(e => e.stage === Stage.SIGNUP);

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
    <Layout paddingHorizontal={40} flex color={color?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        enabled={true}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <Label marginBottom={40} bold centered size={sizes._19sdp}>Đăng Ký</Label>
          {Form()}
          <Button middle shadow marginTop={35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR} onPress={handleSignup}>
            <Label color='#fff' bold>Đăng ký</Label>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  forms: state.AuthenticateState.forms,
  register: state.AuthenticateState.register,
  validationSignUpSchema: state.AuthenticateState.validationSignUpSchema,
});
const mapDispatchToProps = {
  ...AuthAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignUpLayout as any);
