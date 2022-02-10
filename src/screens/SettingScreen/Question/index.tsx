import React, { useState } from 'react';
import { FlatList, Image, Text } from 'react-native';
import { Layout, Label, Button, TextInputUI } from 'components';
import styled from 'styled-components/native';
import { useColor, useDebouncedEffect } from 'hooks';
import { IconImage, ImageAssets } from 'assets';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ContextAction } from 'store/context';
import alertDefaultTitle from 'utils/AlertDefaultTitle';
import { useNavigation } from '@react-navigation/core';
import { RouteName } from 'constant';
import Spinner from 'react-native-spinkit';

interface UIProps {
    navigation: any;
    listQuestion: any;
    loadmoreQuestion: any;
}

const QuestionLayout = (props: UIProps & typeof ContextAction) => {
    const colors = useColor();
    const navigation = useNavigation();

    const [search, setSearch] = useState<string>();
    const [refreshing, setRefreshing] = useState(false);
    const _keyExtractor = (item: any, index: number) => index.toString();


    useDebouncedEffect(() => {
        if (search !== undefined && search == '') {
            props.FieldChange('listQuestion', []);
            props.FieldChange('loadmoreQuestion', { ...props.loadmoreQuestion, offset: 0, isEnd: false });
            props.GetQuestion(10, 0);
        }
        if ((search && search.length > 1)) {
            props.FieldChange('loadmoreQuestion', { ...props.loadmoreQuestion, offset: 0, isEnd: false });
            props.FieldChange('listQuestion', []);
            props.GetQuestion(10, 0, search);
        }
    }, [search], 700);

    const onRefresh = () => {
        setRefreshing(true);
        props.FieldChange('loadmoreQuestion', { ...props.loadmoreQuestion, offset: 0, isEnd: false });
        props.FieldChange('listQuestion', []);
        props.GetQuestion(10, 0, search);
        setRefreshing(false);
    }


    const onEndReached = () => {
        if (!props.loadmoreQuestion.isEnd) {
            let offset = props.loadmoreQuestion.offset + 10;
            props.FieldChange('loadmoreQuestion', { ...props.loadmoreQuestion, offset: offset });
            props.GetQuestion(10, offset, search);
        }
    }

    const renderFooter = () => {
        if (props.loadmoreQuestion.isEnd) return <></>;
        else return <Layout paddingVertical={5} marginBottom={15} centered middle>
            <Spinner
                isVisible
                type='Circle'
                size={sizes._22sdp}
                color={colors?.BUTTON_COLOR}
            />
        </Layout>
    }

    const renderItem = ({ item }) => (
        <Layout borderRadius={10} marginHorizontal={20} color={'#fff'} shadow marginVertical={10} padding={15}>
            <Label marginBottom={5} bold>{item.question}</Label>
            <Label>{item.answer}</Label>
        </Layout>
    );

    return (
        <Layout style={{ flex: 1 }} color={colors?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14}>
            <Label size={sizes._16sdp} bold marginHorizontal={20} marginBottom={10}>Câu hỏi thường gặp</Label>
            <Layout paddingHorizontal={20}>
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
                style={{ marginTop: 20 }}
                keyExtractor={_keyExtractor}
                data={props.listQuestion}
                renderItem={renderItem}
                onEndReachedThreshold={0.9}
                onRefresh={onRefresh}
                refreshing={refreshing}
                onEndReached={onEndReached}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={() => (!props.listQuestion?.length && (props.loadmoreQuestion?.isEnd)) ?
                    <Label centered marginTop={20}>Không có câu hỏi</Label>
                    : <></>
                }
            />
        </Layout>
    );
};
const mapStateToProps = (state: ApplicationState) => ({
    listQuestion: state.ContextState.listQuestion,
    loadmoreQuestion: state.ContextState.loadmoreQuestion,
});
const mapDispatchToProps = {
    ...ContextAction
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(QuestionLayout as any);
