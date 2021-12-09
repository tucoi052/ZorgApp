import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Image,
} from 'react-native';
import { TextInputUI, Layout, Label, Button } from 'components';
import { FormStage, Row, Stage, TypeField } from 'models/form';
import { sizes, _screen_height } from 'utils/sizes';
import { useColor } from 'hooks';
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'components/Radio';
import dateClient from 'utils/dateClient';


interface State {
    forms: FormStage[],
    errorMessage: Function,
    formik: any
}
const genderInit = [
    'CMND/CCCD',
    'Hộ chiếu',
]
type UIProps = State;

const ChangeInfo2Layout = (props: UIProps) => {
    const color = useColor();
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     if (props.formik) {
    //         if (!props.formik.values['identifiedType'])
    //             props.formik.setFieldValue('identifiedType', 'CMND/CCCD');
    //     }
    // }, [])

    let form = props.forms?.find(e => e.stage === Stage.PROFILE2);

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
                    genderInit.map((e, i) => (
                        <Button direction='row' centered middle marginTop={15} paddingLeft={15}
                            onPress={() => {
                                props.formik.setFieldValue('identifiedType', i);
                            }}>
                            <RadioButton selected={i == props.formik.values['identifiedType']} style={{}} />
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

    if (form) {
        return (
            <Layout>
                {form?.rows.map((r: Row, i: number) => (
                    <Layout key={i}>
                        {r.controls.map((c, index) => {
                            return <>
                                {c.type == TypeField.TEXT && textInput(c, index)}
                                {c.type == TypeField.RADIOBUTTON && radioPicker(c, index)}
                            </>
                        })}
                    </Layout>
                ))}
            </Layout>
        );
    }
    return <></>;
};
export default ChangeInfo2Layout;
