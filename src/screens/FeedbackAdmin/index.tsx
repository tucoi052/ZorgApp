import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  feedbackAdmin: any,
  loadmore: any
}

const FeedbackAdmin = (props: UIProps & typeof ContextAction) => {
  const colors = useColor();
  const [refreshing, setRefreshing] = useState(false);
  const _keyExtractor = (item: any, index: number) => index.toString();


  useEffect(() => {
    props.GetFeedback();
  }, [])

  const onRefresh = () => {
    setRefreshing(true);
    props.FieldChange('feedbackAdmin', []);
    props.GetFeedback();
    setRefreshing(false);
  }

  return (
    <Layout style={{ flex: 1 }} color={colors?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14} >
      <Layout paddingHorizontal={20}>
        <Label marginBottom={10} size={sizes._15sdp} bold>Phản hồi</Label>
      </Layout>
      <FlatList
        keyExtractor={_keyExtractor}
        data={props.feedbackAdmin}
        renderItem={({ item }) => (<Layout paddingTop={10} paddingBottom={20} color='#fff' borderRadius={10} shadow marginVertical={15} marginHorizontal={20} paddingHorizontal={20}>
          <Label centered bold>{item?.user?.first_name + ' ' +  item?.user?.last_name}</Label>
          <Label marginVertical={5}>Email: {item?.user?.email}</Label>
          <Label>Phản hồi: </Label>
          <Label marginVertical={5}>Tiêu đề: {item?.title}</Label>
          <Label>Nội dung: {item?.content}</Label>
        </Layout>)}
        onEndReachedThreshold={0.9}
        onRefresh={onRefresh}
        refreshing={refreshing}
        // onEndReached={onEndReached}
        // ListFooterComponent={renderFooter}
        ListEmptyComponent={() => (!props.feedbackAdmin?.length) ?
          <Label centered marginTop={20}>Không có phản hồi</Label>
          : <></>
        }
      />
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  feedbackAdmin: state.ContextState.feedbackAdmin,
});
const mapDispatchToProps = {
  ...ContextAction
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FeedbackAdmin as any);
