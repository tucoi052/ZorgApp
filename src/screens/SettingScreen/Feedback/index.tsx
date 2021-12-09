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
import { FeedBack } from 'models/user';

interface State {
    forms?: FormStage[];
    feedback: FeedBack;
    validationFeedBackSchema: any;
}
type UIProps = State & typeof ContextAction;

const FeedbackLayout = (props: UIProps) => {
    const color = useColor();
    const navigation = useNavigation();
    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: props.validationFeedBackSchema,
        initialValues: { ...props.feedback },
        onSubmit: (values: any) => {
            props.PostFeedBack(values);
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
        let form = props.forms?.find(e => e.stage === Stage.FEEDBACK);

        if (form) {
            return (
                <Layout>
                    {form?.rows.map((r: Row, i: number) => (
                        <Layout key={i}>
                            {r.controls.map((c, index) => (
                                <Layout>
                                    <Label marginTop={10}>{c.label}</Label>
                                    <TextInputUI
                                        key={index}
                                        placeholder={c.placeholder}
                                        uistyle={{ paddingTop: 2 }}
                                        type={c.type}
                                        keyboardType={c.keyboardType}
                                        layoutstyle={[{ backgroundColor: '#fff' }, c.label == 'Nội dung' && { height: sizes._200sdp }]}
                                        multiline={c.label == 'Nội dung'}
                                        contentstyle={[{ marginHorizontal: 10 }, c.label == 'Nội dung' && { height: sizes._170sdp }]}
                                        errorMessage={errorMessage(c.fieldName)}
                                        textValue={formik.values[c.fieldName]}
                                        onChangeText={(text: string) => {
                                            formik.setFieldValue(c.fieldName, text);
                                        }}
                                    />
                                </Layout>
                            ))}
                        </Layout>
                    ))}
                </Layout>
            );
        }
        return <></>;
    }

    return (
        <Layout paddingHorizontal={20} flex color={color?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
            <Label size={sizes._16sdp} bold marginBottom={10}>Trợ giúp</Label>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                enabled={true}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                    {Form()}
                    <Button middle shadow marginTop={35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR} onPress={handleSignup}>
                        <Label color='#fff' bold>Gửi</Label>
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </Layout>
    );
};
const mapStateToProps = (state: ApplicationState) => ({
    forms: state.ContextState.forms,
    feedback: state.ContextState.feedback,
    validationFeedBackSchema: state.ContextState.validationFeedBackSchema,
});
const mapDispatchToProps = {
    ...ContextAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FeedbackLayout as any);
