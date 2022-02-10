import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { Layout, Label, Button, TextInputUI } from 'components';
import styled from 'styled-components/native';
import { useColor, useDebouncedEffect } from 'hooks';
import { IconImage, ImageAssets } from 'assets';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { isObject } from 'formik/dist/utils';
import { ItemDoctorLayout, ItemUserLayout } from 'screens/Shared';
import Animated, { color, Transition, Transitioning } from 'react-native-reanimated';
import { ApplicationState } from 'store/configureAction';
import { ActionCreators as ContextAction } from 'store/context';
import { ActionCreators as AuthAction } from 'store/authenticate';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Doctor } from 'models/doctor';
import Spinner from 'react-native-spinkit';
import { useFocusEffect } from '@react-navigation/core';

interface UIProps {
	navigation: any;
	route: any;
	listUserAdmin: any,
	loadmoreUser: any,
	Logout: Function
}

const UserAdmin = (props: UIProps & typeof ContextAction) => {
	const colors = useColor();
	const [search, setSearch] = useState<string>();
	const [refreshing, setRefreshing] = useState(false);
	const id = props.route?.params?.id ?? '';
	const _keyExtractor = (item: any, index: number) => index.toString();

	useEffect(() => {
		props.GetUserAdmin(10, 0);
	}, [])

	useDebouncedEffect(() => {
		if (search !== undefined && search == '') {
			props.FieldChange('listUserAdmin', []);
			props.FieldChange('loadmoreUser', { ...props.loadmoreUser, offset: 0, isEnd: false });
			props.GetUserAdmin(10, 0);
		}
		if ((search && search.length > 1)) {
			props.FieldChange('loadmoreUser', { ...props.loadmoreUser, offset: 0, isEnd: false });
			props.FieldChange('listUserAdmin', []);
			props.GetUserAdmin(10, 0, search);
		}
	}, [search], 700);

	const onRefresh = () => {
		setRefreshing(true);
		props.FieldChange('loadmoreUser', { ...props.loadmoreUser, offset: 0, isEnd: false });
		props.FieldChange('listUserAdmin', []);
		props.GetUserAdmin(10, 0, search);
		setRefreshing(false);
	}


	const onEndReached = () => {
		if (!props.loadmoreUser.isEnd) {
			let offset = props.loadmoreUser.offset + 10;
			props.FieldChange('loadmoreUser', { ...props.loadmoreUser, offset: offset });
			props.GetUserAdmin(10, offset, search);
		}
	}

	const renderFooter = () => {
		if (props.loadmoreUser.isEnd) return <></>;
		else return <Layout paddingVertical={5} marginBottom={15} centered middle>
			<Spinner
				isVisible
				type='Circle'
				size={sizes._22sdp}
				color={colors?.BUTTON_COLOR}
			/>
		</Layout>
	}
	// console.log(props.listUserAdmin);


	return (
		<Layout style={{ flex: 1 }} color={colors?.PRIMARY_COLOR} paddingTop={_screen_height * 0.14} >
			<Layout paddingHorizontal={20}>
				<Label marginBottom={10} size={sizes._15sdp}>Tìm kiếm người dùng</Label>
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
				data={props.listUserAdmin}
				renderItem={({ item }) => (<ItemUserLayout item={item} id={id} />)}
				onEndReachedThreshold={0.9}
				onRefresh={onRefresh}
				refreshing={refreshing}
				onEndReached={onEndReached}
				ListFooterComponent={renderFooter}
				ListEmptyComponent={() => (!props.listUserAdmin?.length && (props.loadmoreUser?.isEnd)) ?
					<Label centered marginTop={20}>Không có bác sĩ</Label>
					: <></>
				}
			/>
			<Button middle style={{ position: 'absolute', top: _screen_width * 0.15, right: 30 }}
				onPress={() => {
					props.Logout()
				}}>
				<Image
					source={IconImage.logout}
					style={{ width: 20, height: 20, tintColor: colors?.BUTTON_COLOR }}
				/>
				<Label size={sizes._12sdp} color={colors?.BUTTON_COLOR}>Đăng xuất</Label>
			</Button>
		</Layout>
	);
};
const mapStateToProps = (state: ApplicationState) => ({
	listUserAdmin: state.ContextState.listUserAdmin,
	loadmoreUser: state.ContextState.loadmoreUser
});
const mapDispatchToProps = {
	...ContextAction,
    Logout: AuthAction.Logout
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserAdmin as any);
