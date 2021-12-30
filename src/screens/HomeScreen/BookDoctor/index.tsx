import React, { useEffect, useRef, useState } from 'react';
import { Image, Text } from 'react-native';
import { Layout, Label, Button, TextInputUI } from 'components';
import styled from 'styled-components/native';
import { useColor } from 'hooks';
import { IconImage, ImageAssets } from 'assets';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { connect, useStore } from 'react-redux';
import { compose } from 'redux';
import { ApplicationState } from 'store/configureAction';
import { useNavigation } from '@react-navigation/core';
import { RouteName } from 'constant';
import { ActionCreators as ContextAction } from 'store/context';
import dateClient from 'utils/dateClient';
import DatePicker from 'react-native-date-picker';

interface UIProps {
  navigation: any;
  route: any,
  detailBook: any
}

const BookDoctor = (props: UIProps & typeof ContextAction) => {
  const navigation = useNavigation();
  const colors = useColor();
  const item = props.route?.params?.item ?? '';
  const id = props.route?.params?.id ?? '';
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState('');
  const timeType = useRef<string>('date');

  useEffect(()=>{
    if(props.detailBook){
      props.navigation.replace(RouteName.DETAIL_BOOK);
    }
  },[props.detailBook])

  return (
    <Layout paddingHorizontal={20} style={{ flex: 1 }} color={colors?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
      <Label size={sizes._15sdp}>Thời gian khám</Label>
      <Label marginLeft={10} marginVertical={10}>Giờ</Label>
      <Button paddingHorizontal={40} paddingVertical={10} borderRadius={15} color='#fff' style={{ alignSelf: 'center' }} shadow
        onPress={() => {
          timeType.current = 'time';
          setModal(true);
        }}>
        <Label>{dateClient.getTimeString(time)}</Label>
      </Button>
      <Label marginLeft={10} marginVertical={10}>Ngày</Label>
      <Button paddingHorizontal={40} paddingVertical={10} borderRadius={15} color='#fff' style={{ alignSelf: 'center' }} shadow
        onPress={() => {
          timeType.current = 'date';
          setModal(true);
        }}>
        <Label>{dateClient.getDateString(date)}</Label>
      </Button>
      <Label size={sizes._15sdp} marginTop={25} marginBottom={20}>Nội dung tổng quát cần được tư vấn</Label>
      <TextInputUI
        placeholder={'Nội dung'}
        uistyle={{ paddingTop: 2 }}
        layoutstyle={{ backgroundColor: '#fff', height: sizes._200sdp }}
        multiline
        contentstyle={{ marginHorizontal: 10, height: sizes._170sdp }}
        textValue={description}
        onChangeText={setDescription}
      />

      <Button padding={10} direction={'row'} middle style={{ position: 'absolute', bottom: 10, right: 0 }}
      onPress={()=>{
        props.BookDoctor(item.id, {
          hourStart: dateClient.getTimeString(time),
          dateStart: dateClient.getDateString(date).split('/').reverse().join('-'),
          service: id,
          doctorName: item.fullName,
          description: description
        })
        // navigation.navigate(RouteName.DETAIL_BOOK);
      }}>
        <Label size={sizes._14sdp} marginRight={10}>Tiếp theo</Label>
        <Image source={IconImage.arrowLeft} style={{ width: 17, height: 19, resizeMode: 'contain' }} />
      </Button>
      <DatePicker
        modal
        open={modal}
        date={timeType.current == 'time' ? time : date}
        mode={timeType.current}
        minimumDate={new Date()}
        onConfirm={(date) => {
          setModal(false);
          if (timeType.current == 'time') setTime(date)
          else
            setDate(date);
        }}
        onCancel={() => {
          setModal(false)
        }}
        locale='vi'
        title='Chọn ngày tháng năm sinh'
        confirmText='Chọn ngày'
        cancelText='Hủy'
      />
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  detailBook: state.ContextState.detailBook,
});
const mapDispatchToProps = {
  ...ContextAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BookDoctor as any);
