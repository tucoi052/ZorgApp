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
import { color } from 'react-native-reanimated';

interface UIProps {
    navigation: any;
    route: any,
    detailBook: any
}

const DetailBook = (props: UIProps & typeof ContextAction) => {
    const colors = useColor();


    const department = () => {
        if (props.detailBook?.service == 0) return 'Nội tổng quát';
        if (props.detailBook?.service == 1) return 'Tai, mũi, họng';
        if (props.detailBook?.service == 2) return 'Nhi khoa';
        if (props.detailBook?.service == 3) return 'Sức khỏe tâm thần & dinh dưỡng';
    }

    const date = () => {
        let index = props.detailBook?.startTime.indexOf('T');
        return props.detailBook?.startTime.substring(0, index).split('-').reverse().join('/');
    }

    const time = () => {
        let index = props.detailBook?.startTime.indexOf('T');
        return props.detailBook?.startTime.substring(index + 1);
    }

    return (
        <Layout paddingHorizontal={20} style={{ flex: 1 }} color={colors?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
            <Label bold size={sizes._15sdp} marginBottom={20}>Chi tiết lịch khám</Label>
            <Label size={sizes._13sdp}>Nội dung khám:</Label>
            <Layout marginVertical={10} style={{ borderBottomWidth: 0.5, borderColor: 'grey' }}>
                <Label size={sizes._13sdp} marginBottom={5}>{department()}</Label>
            </Layout>
            <Label marginTop={10} size={sizes._13sdp}>Chi tiết:</Label>
            <Layout flex color='#ffff' marginVertical={10} padding={15} shadow borderRadius={10}>
                <Label>Bác sĩ: {props.detailBook?.doctorName}</Label>
                <Label marginVertical={10}>Ngày: {date()}</Label>
                <Label>Giờ: {time()}</Label>
                <Label marginVertical={10}>Nền tảng: Zoom</Label>
                <Label>Mô tả: {props.detailBook?.description}</Label>
                <Button marginVertical={10}>
                    <Label>Link phòng họp: {props.detailBook?.joinUrl}</Label>
                </Button>
            </Layout>

            <Button marginVertical={20} color={colors?.BUTTON_COLOR} padding={10} middle borderRadius={10} marginHorizontal={_screen_width * 0.3}
                onPress={() => props.navigation.goBack()}>
                <Label color='#fff'>Hoàn thành</Label>
            </Button>
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

export default compose(withConnect)(DetailBook as any);
