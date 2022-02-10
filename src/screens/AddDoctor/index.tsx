import React, { useEffect, useState } from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
    Platform,
    ScrollView,
    Image,
} from 'react-native';
import { TextInputUI, Layout, Label, Button, Modal } from 'components';
import { FormStage, Row, Stage, TypeField } from 'models/form';
import { sizes, _screen_height } from 'utils/sizes';
import { useColor } from 'hooks';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IconImage } from 'assets';
import { useFormik } from 'formik';
import { RouteName } from 'constant';
import { ActionCreators as ContextAction } from 'store/context';

const dataItem = [
    {
        title: 'Nội tổng quát',
        assert: IconImage.doctor,
    },
    {
        title: 'Tai, mũi, họng',
        assert: IconImage.ent,
    },
    {
        title: 'Nhi khoa',
        assert: IconImage.baby,
    },
    {
        title: 'Sức khỏe tâm thần & dinh dưỡng',
        assert: IconImage.mental,
    }

]

interface State {
    forms: FormStage[],
    validationAddDoctorSchema: any,
    doctor: any,
    doctorId: any,
    navigation: any,
    route: any
}

type UIProps = State & typeof ContextAction;

const AddDoctor = (props: UIProps) => {
    const color = useColor();
    const [open, setOpen] = useState(false);
    const item = props.route?.params?.item;
    const onRefresh = props.route?.params?.onRefresh;


    useEffect(() => {
        if (props.doctorId) {
            if (props.doctorId == 'updateDone'){
                props.navigation.goBack();
                onRefresh();
            }
            else
                props.navigation.replace(RouteName.ADD_ACCOUNT);
        }
    }, [props.doctorId])

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: props.validationAddDoctorSchema,
        initialValues: item ? { ...item } : { ...props.doctor },
        onSubmit: (values: any) => {
            if (item)
                props.UpdateDoctor(values);
            else
                props.AddDoctor(values);
        },
    });
    const errorMessage = (fieldName: string) => {
        if (formik.touched[fieldName] && formik.errors[fieldName]) {
            return formik.errors[fieldName]?.toString();
        }
        return undefined;
    };
    const handleSubmit = () => {
        formik.handleSubmit();
    };

    let form = props.forms?.find(e => e.stage === Stage.ADD_DOCTOR);

    const textInput = (c, index) => (
        <Layout marginVertical={10}>
            <Label marginBottom={5}>
                {c.label}
            </Label>
            <TextInputUI
                key={index}
                placeholder={c.placeholder}
                // uistyle={{ marginTop: 8 }}
                type={c.type}
                keyboardType={c.keyboardType}
                layoutstyle={[{ backgroundColor: '#fff' }, c.label == 'Mô tả' && { height: sizes._150sdp }]}
                multiline={c.label == 'Mô tả'}
                contentstyle={[{ marginHorizontal: 10 }, c.label == 'Mô tả' && { height: sizes._140sdp }]}
                errorMessage={errorMessage(c.fieldName)}
                textValue={formik.values[c.fieldName]}
                onChangeText={(text: string) => {
                    formik.setFieldValue(c.fieldName, text);
                }}
            />
        </Layout>
    )

    const textModal = (c, index) => (
        <Button marginVertical={10} onPress={() => setOpen(true)}>
            <Label marginBottom={5}>
                {c.label}
            </Label>
            <Layout color='#fff' paddingVertical={20} borderRadius={10}>
                <Label color='#8C8C8C' marginLeft={10}>{formik.values[c.fieldName] !== null ? dataItem[formik.values[c.fieldName]].title : c.placeholder}</Label>
            </Layout>
            {errorMessage(c.fieldName) && <Label
                color="red"
                style={{ fontSize: sizes._10sdp, fontStyle: 'italic' }}
                paddingTop={sizes._10sdp}>
                {errorMessage(c.fieldName)}
            </Label>}
        </Button>
    )

    if (form) {
        return (
            <Layout paddingHorizontal={20} flex color={color?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                    enabled={true}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <Label h3 bold marginBottom={25}>{item ? 'Cập nhật bác sĩ' : 'Thêm bác sĩ mới'}</Label>
                        <Layout>
                            {form?.rows.map((r: Row, i: number) => (
                                <Layout key={i}>
                                    {r.controls.map((c, index) => {
                                        return <>
                                            {c.type == TypeField.TEXT && textInput(c, index)}
                                            {c.type == TypeField.MODAL && textModal(c, index)}
                                        </>
                                    })}
                                </Layout>
                            ))}
                        </Layout>
                        {item && <Button middle shadow marginTop={35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR}
                            onPress={handleSubmit}>
                            <Label color='#fff' bold>Cập nhật</Label>
                        </Button>}
                    </ScrollView>
                </KeyboardAvoidingView>
                {!item && <Button padding={10} direction={'row'} middle style={{ position: 'absolute', bottom: 10, right: 0 }}
                    onPress={handleSubmit}
                >
                    <Label size={sizes._14sdp} marginRight={10}>Tiếp theo</Label>
                    <Image source={IconImage.arrowLeft} style={{ width: 17, height: 19, resizeMode: 'contain' }} />
                </Button>}
                <Modal isVisible={open} onBackdropPress={() => setOpen(false)}>
                    <Layout paddingHorizontal={20} color={'#fff'} padding={10} borderRadius={10}>
                        <Label bold h3 marginVertical={10}>Chọn khoa</Label>
                        {dataItem.map((e, index) => (
                            <Button horizontal margin={10} middle
                                onPress={() => {
                                    formik.setFieldValue('department', index);
                                    setOpen(false);
                                }}>
                                <Image
                                    source={e.assert}
                                    style={{ width: 30, height: 30, marginRight: 10 }} />
                                <Label size={sizes._14sdp}>{e.title}</Label>
                            </Button>
                        ))}
                    </Layout>
                </Modal>
            </Layout>
        );
    }
    return <></>;
};
const mapStateToProps = (state: ApplicationState) => ({
    forms: state.ContextState.forms,
    doctor: state.ContextState.doctor,
    validationAddDoctorSchema: state.ContextState.validationAddDoctorSchema,
    doctorId: state.ContextState.doctorId
});
const mapDispatchToProps = {
    ...ContextAction
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddDoctor as any);