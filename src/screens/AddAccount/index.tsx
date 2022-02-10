import React, { useEffect, useState } from 'react';
import { TextInputUI, Layout, Label, Button, Modal } from 'components';
import { FormStage, Row, Stage, TypeField } from 'models/form';
import { sizes, _screen_height } from 'utils/sizes';
import { useColor } from 'hooks';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IconImage } from 'assets';
import { useFormik } from 'formik';
import { ActionCreators as ContextAction } from 'store/context';


interface State {
    forms: FormStage[],
    validationAddAccountSchema: any,
    accountDoctor: any,
    doctorId: any
}

type UIProps = State & typeof ContextAction;

const AddAccount = (props: UIProps) => {
    const color = useColor();
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: props.validationAddAccountSchema,
        initialValues: { ...props.accountDoctor },
        onSubmit: (values: any) => {
            props.AddAccount(values);
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

    let form = props.forms?.find(e => e.stage === Stage.ADD_ACCOUNT);

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
                errorMessage={errorMessage(c.fieldName)}
                textValue={formik.values[c.fieldName]}
                onChangeText={(text: string) => {
                    formik.setFieldValue(c.fieldName, text);
                }}
            />
        </Layout>
    )

    if (form) {
        return (
            <Layout paddingHorizontal={20} flex color={color?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
                <Label h3 bold marginBottom={25}>Đăng ký tài khoản</Label>
                <Layout>
                    {form?.rows.map((r: Row, i: number) => (
                        <Layout key={i}>
                            {r.controls.map((c, index) => {
                                return <>
                                    {c.type == TypeField.TEXT && textInput(c, index)}
                                </>
                            })}
                        </Layout>
                    ))}
                </Layout>
                <Button middle shadow marginTop={35} borderRadius={10} padding={15} color={color?.BUTTON_COLOR}
                    onPress={handleSubmit}>
                    <Label color='#fff' bold>Hoàn thành</Label>
                </Button>
            </Layout>
        );
    }
    return <></>;
};
const mapStateToProps = (state: ApplicationState) => ({
    forms: state.ContextState.forms,
    accountDoctor: state.ContextState.accountDoctor,
    validationAddAccountSchema: state.ContextState.validationAddAccountSchema,
    doctorId: state.ContextState.doctorId
});
const mapDispatchToProps = {
    ...ContextAction
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddAccount as any);