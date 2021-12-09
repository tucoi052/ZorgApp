import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import { Layout, Label, Button } from 'components';
import styled from 'styled-components/native';
import { useColor } from 'hooks';
import { IconImage, ImageAssets } from 'assets';
import { sizes, _screen_width } from 'utils/sizes';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as AuthAction } from 'store/authenticate';
import { ActionCreators as ContextAction } from 'store/context';
import alertDefaultTitle from 'utils/AlertDefaultTitle';
import { useNavigation } from '@react-navigation/core';
import { RouteName } from 'constant';

interface UIProps {
  navigation: any;
  Logout: Function;
  GetQuestion: Function;
  FieldChange: Function;
}

const dataItem = [
  {
    title: 'Thông tin',
    assert: IconImage.information,
  },
  {
    title: 'Câu hỏi thường gặp',
    assert: IconImage.communication,
  },
  {
    title: 'Trợ giúp',
    assert: IconImage.customer,
  },
  {
    title: 'Đăng xuất',
    assert: IconImage.logout,
  }

]
const SettingLayout = (props: UIProps) => {
  const colors = useColor();
  const navigation = useNavigation();

  const onPressItem = (index) => {
    if (index == 0)
      navigation.navigate(RouteName.PROFILE);
    if (index == 1){
      props.FieldChange('listQuestion', []);
      props.GetQuestion(10,0);
      navigation.navigate(RouteName.QUESTION);
    }
    if (index == 2)
      navigation.navigate(RouteName.FEEDBACK);
    if (index == 3) {
      alertDefaultTitle.show('Bạn muốn đăng xuất ?', 'OK', () => {
        props.Logout();
      }, 'Hủy')
    }
  }

  const Item = (item, index) => (
    <Button key={index} middle style={{ width: _screen_width / 2 - 40 }} borderRadius={10} color='#fff'
      margin={10} paddingBottom={20} shadow onPress={() => onPressItem(index)}>
      <Layout marginTop={20} centered middle padding={20} borderRadius={50} color={colors?.PRIMARY_COLOR}>
        <Image
          source={item.assert}
          style={{ width: 40, height: 40 }}
        />
      </Layout>
      <Label bold marginTop={10} centered>{item.title}</Label>
    </Button>
  )

  return (
    <Layout style={{ flex: 1 }} color={colors?.PRIMARY_COLOR}>
      <Layout middle>
        <Image
          style={{ marginTop: 20 }}
          source={ImageAssets.logo} />
      </Layout>
      <Label centered bold size={sizes._19sdp}>Bạn cần hỗ trợ dịch vụ nào ?</Label>
      <Layout marginTop={35} centered flexGrow={1} style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {dataItem.map((e, index) => Item(e, index))}
      </Layout>

    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  forms: state.AuthenticateState.forms,
  user: state.AuthenticateState.user,
  validationSchema: state.AuthenticateState.validationSchema,
});
const mapDispatchToProps = {
  Logout: AuthAction.Logout,
  GetQuestion: ContextAction.GetQuestion,
  FieldChange: ContextAction.FieldChange
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SettingLayout as any);
