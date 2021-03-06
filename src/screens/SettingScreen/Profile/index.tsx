import React, { useEffect, useState } from 'react';
import { ScrollView, Image, _View, View } from 'react-native';
import { Layout, Label, Button, TextInputUI } from 'components';
import styled from 'styled-components/native';
import { useColor } from 'hooks';
import { IconImage, ImageAssets } from 'assets';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ContextAction } from 'store/context';
import { FormStage, Row, Stage, TypeField } from 'models/form';
import dateClient from 'utils/dateClient';
import { RadioButton } from 'components/Radio';
import { useFormik } from 'formik';
import { Profile } from 'models/user';
import ChangeInfoLayout from './components/ChangeInfo';
import { RouteName } from 'constant';
import ChangeInfo2Layout from './components/ChangeInfo2';

interface UIProps {
  navigation: any;
  forms: FormStage[],
  validationInfoSchema: any,
  validationInfo2Schema: any,
  profile: Profile,
  route: any,
  UpdateProfile: Function,
  GetProfile: Function
}



const ProfileLayout = (props: UIProps) => {
  const colors = useColor();
  const type = props.route?.params?.type ?? '';
  const values = props.route?.params?.values ?? {};

  useEffect(() => {
    props.GetProfile();
  }, [])

  const formik = useFormik({
    enableReinitialize: false,
    validationSchema: type != 'info2' ? props.validationInfoSchema : props.validationInfo2Schema,
    initialValues: type != 'info2' ? { ...props.profile } : { ...values },
    onSubmit: (values: any) => {
      type != 'info2' ? props.navigation.push(RouteName.PROFILE, { type: 'info2', values: values }) : props.UpdateProfile(values);
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



  return (
    <Layout style={{ flex: 1 }} color={colors?.PRIMARY_COLOR} paddingHorizontal={20} paddingTop={_screen_height * 0.13}>
      <Label bold size={sizes._16sdp} marginBottom={15}>Th??ng tin c?? nh??n</Label>
      <ScrollView>
        {
          type == 'info2' ?
            <ChangeInfo2Layout forms={props.forms} errorMessage={errorMessage} formik={formik} />
            :
            <ChangeInfoLayout forms={props.forms} errorMessage={errorMessage} formik={formik} />
        }

        {
          type == 'info2' ?
            <Button marginTop={20} color={colors?.BUTTON_COLOR} middle padding={10} borderRadius={10} marginHorizontal={_screen_width * 0.25}
              onPress={handleSubmit}>
              <Label bold color="#fff">L??u</Label>
            </Button> :
            <View style={{ height: _screen_height * 0.1 }}>
              <Button padding={10} direction={'row'} middle style={{ position: 'absolute', bottom: 10, right: 0 }}
                onPress={handleSubmit}>
                <Label size={sizes._14sdp} marginRight={10}>Ti???p theo</Label>
                <Image source={IconImage.arrowLeft} style={{ width: 17, height: 19, resizeMode: 'contain' }} />
              </Button>
            </View>
        }
      </ScrollView>
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  forms: state.ContextState.forms,
  profile: state.ContextState.profile,
  validationInfoSchema: state.ContextState.validationInfoSchema,
  validationInfo2Schema: state.ContextState.validationInfo2Schema,
});
const mapDispatchToProps = {
  UpdateProfile: ContextAction.UpdateProfile,
  GetProfile: ContextAction.GetProfile,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfileLayout as any);
