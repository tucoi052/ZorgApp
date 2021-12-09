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
import { TextInputUI, Layout, Label, Button } from 'components';
import { FormStage, Row, Stage, TypeField } from 'models/form';
import { sizes, _screen_height } from 'utils/sizes';
import { useColor } from 'hooks';
import { useNavigation } from '@react-navigation/core'; 1
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'components/Radio';
import dateClient from 'utils/dateClient';


interface State {
    forms: FormStage[],
    errorMessage: Function,
    formik: any
}
const genderInit = [
    'Nam',
    'Nữ',
    'Khác'
]
type UIProps = State;

const ChangeInfoLayout = (props: UIProps) => {
    const color = useColor();
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     if (props.formik) {
    //         if (!props.formik.values['dob'])
    //             props.formik.setFieldValue('dob', new Date());
    //         if (!props.formik.values['gender'])
    //             props.formik.setFieldValue('gender', 'Nam');
    //     }
    // }, [])

    let form = props.forms?.find(e => e.stage === Stage.PROFILE1);

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
                layoutstyle={{ backgroundColor: '#fff' }}
                contentstyle={{ marginHorizontal: 10 }}
                errorMessage={props.errorMessage(c.fieldName)}
                textValue={props.formik.values[c.fieldName]}
                onChangeText={(text: string) => {
                    props.formik.setFieldValue(c.fieldName, text);
                }}
            />
        </Layout>
    )

    const radioPicker = (c, index) => (
        <Layout marginVertical={10}>
            <Label>
                {c.label}
            </Label>
            <Layout direction='row' justifyContent='space-around'>
                {
                    genderInit.map((e,i) => (
                        <Button direction='row' centered middle marginTop={15} paddingLeft={15}
                            onPress={() => {
                                props.formik.setFieldValue('gender', i);
                            }}>
                            <RadioButton selected={i == props.formik.values['gender']} style={{}} />
                            <Label marginLeft={5} color='#39434c'>{e}</Label>
                        </Button>
                    ))
                }
            </Layout>
            {props.errorMessage(c.fieldName) && <Label color="red"
                style={{ fontSize: sizes._10sdp, fontStyle: 'italic' }}
                paddingTop={sizes._10sdp}>{props.errorMessage(c.fieldName)}</Label>}
        </Layout>
    )

    const datePicker = (c, index) => (
        <Layout marginVertical={10}>
            <Label>
                {c.label}
            </Label>
            <Button color='#fff' centered height={sizes._52sdp} borderRadius={10} paddingLeft={10} marginTop={5}
                onPress={() => { setOpen(true) }}>
                <Label color='#39434c'>{props.formik.values['dob'] ? dateClient.getDateString(props.formik.values['dob']) : 'Chọn ngày sinh'}</Label>
            </Button>
            {props.errorMessage(c.fieldName) && <Label color="red"
                style={{ fontSize: sizes._10sdp, fontStyle: 'italic' }}
                paddingTop={sizes._10sdp}>{props.errorMessage(c.fieldName)}</Label>}
        </Layout >
    )

    if (form) {
        return (
            <Layout>
                {form?.rows.map((r: Row, i: number) => (
                    <Layout key={i}>
                        {r.controls.map((c, index) => {
                            return <>
                                {c.type == TypeField.TEXT && textInput(c, index)}
                                {c.type == TypeField.DATEPICKER && datePicker(c, index)}
                                {c.type == TypeField.RADIOBUTTON && radioPicker(c, index)}
                            </>
                        })}
                    </Layout>
                ))}
                <DatePicker
                    modal
                    open={open}
                    date={props.formik.values['dob'] ? new Date(props.formik.values['dob']) : new Date()}
                    mode='date'
                    maximumDate={new Date()}
                    onConfirm={(date) => {
                        setOpen(false);
                        props.formik.setFieldValue('dob', date);
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                    locale='vi'
                    title='Chọn ngày tháng năm sinh'
                    confirmText='Chọn ngày'
                    cancelText='Hủy'
                />
            </Layout>
        );
    }
    return <></>;
};
export default ChangeInfoLayout;
