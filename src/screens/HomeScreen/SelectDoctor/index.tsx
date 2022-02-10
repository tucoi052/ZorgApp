import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { Layout, Label, Button, TextInputUI } from 'components';
import styled from 'styled-components/native';
import { useColor, useDebouncedEffect } from 'hooks';
import { IconImage, ImageAssets } from 'assets';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { isObject } from 'formik/dist/utils';
import { ItemDoctorLayout } from 'screens/Shared';
import Animated, { color, Transition, Transitioning } from 'react-native-reanimated';
import { ApplicationState } from 'store/configureAction';
import { ActionCreators as ContextAction } from 'store/context';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Doctor } from 'models/doctor';
import Spinner from 'react-native-spinkit';
import { useFocusEffect } from '@react-navigation/core';

interface UIProps {
  navigation: any;
  route: any;
  listDoctor: Doctor[],
  loadmore: any
}

const SelectDoctorLayout = (props: UIProps & typeof ContextAction) => {
  const colors = useColor();
  const [search, setSearch] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);
  const id = props.route?.params?.id ?? '';
  const _keyExtractor = (item: any, index: number) => index.toString();

  useFocusEffect(()=>{
    props.FieldChange('detailBook', undefined);
  })

  useDebouncedEffect(() => {
    if (search !== undefined && search == '') {
      props.FieldChange('listDoctor', []);
      props.FieldChange('loadmore', { ...props.loadmore, offset: 0, isEnd: false });
      props.GetDoctor(id, 10, 0);
    }
    if ((search && search.length > 1)) {
      props.FieldChange('loadmore', { ...props.loadmore, offset: 0, isEnd: false });
      props.FieldChange('listDoctor', []);
      props.GetDoctor(id, 10, 0, search);
    }
  }, [search], 700);

  const onRefresh = () => {
    setRefreshing(true);
    props.FieldChange('loadmore', { ...props.loadmore, offset: 0, isEnd: false });
    props.FieldChange('listDoctor', []);
    props.GetDoctor(id, 10, 0, search);
    setRefreshing(false);
  }


  const onEndReached = () => {
    if (!props.loadmore.isEnd) {
      let offset = props.loadmore.offset + 10;
      props.FieldChange('loadmore', { ...props.loadmore, offset: offset });
      props.GetDoctor(id, 10, offset, search);
    }
  }

  const renderFooter = () => {
    if (props.loadmore.isEnd) return <></>;
    else return <Layout paddingVertical={5} marginBottom={15} centered middle>
      <Spinner
        isVisible
        type='Circle'
        size={sizes._22sdp}
        color={colors?.BUTTON_COLOR}
      />
    </Layout>
  }

  return (
    <Layout style={{ flex: 1 }} color={colors?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14} >
      <Layout paddingHorizontal={20}>
        <Label marginBottom={10} size={sizes._15sdp}>Lựa chọn bác sĩ/chuyên gia yêu thích:</Label>
        <TextInputUI
          placeholder={'Tìm kiếm'}
          uistyle={{
            paddingVertical: 1,
            shadowOpacity: 0.22,
            shadowRadius: 15,
            shadowColor: 'gray',
            shadowOffset: { height: 0, width: 0 },
            elevation: 5,
          }}
          layoutstyle={{ backgroundColor: '#fff' }}
          icon={<Image source={IconImage.search} />}
          textValue={search}
          onChangeText={(value) => {
            setSearch(value);
          }}
        />
      </Layout>
      <FlatList
        keyExtractor={_keyExtractor}
        data={props.listDoctor}
        renderItem={({ item }) => (<ItemDoctorLayout item={item} id={id} />)}
        onEndReachedThreshold={0.9}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => (!props.listDoctor?.length && (props.loadmore?.isEnd)) ?
          <Label centered marginTop={20}>Không có bác sĩ</Label>
          : <></>
        }
      />
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  listDoctor: state.ContextState.listDoctor,
  loadmore: state.ContextState.loadmore
});
const mapDispatchToProps = {
  ...ContextAction
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SelectDoctorLayout as any);
