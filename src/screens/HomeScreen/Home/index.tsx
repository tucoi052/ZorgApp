import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { Layout, Label, Button } from 'components';
import styled from 'styled-components/native';
import { useColor } from 'hooks';
import { IconImage, ImageAssets } from 'assets';
import { sizes, _screen_width } from 'utils/sizes';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ApplicationState } from 'store/configureAction';
import { useNavigation } from '@react-navigation/core';
import { RouteName } from 'constant';
import { showLoading } from 'components/loading/LoadingModal';

interface UIProps {
  navigation: any;
}

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
const HomeScreen = (props: UIProps) => {
  const navigation = useNavigation();
  const colors = useColor();

  useEffect(()=>{
    showLoading();
  },[])

  const Item = (item,index) => (
    <Button key={index} middle style={{ width: _screen_width / 2 - 40 }} borderRadius={10} color='#fff'
    margin={10} paddingBottom={20} shadow onPress={() => {
      navigation.navigate(RouteName.SELECT_DOCTOR);
    }}>
      <Layout marginTop={20} centered middle padding={20} borderRadius={50} color={colors?.PRIMARY_COLOR}>
      <Image
        source={item.assert} />
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
        {dataItem.map((e,index) => Item(e,index))}
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
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeScreen as any);
