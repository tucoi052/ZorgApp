import { IconImage, TabIcon } from 'assets';
import { Layout } from 'components';
import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { sizes } from 'utils/sizes';


export const MyTabBar = ({ state, descriptors, navigation }) => {
	const ref = useRef<any>();
	const transition = (
		<Transition.Sequence>
			<Transition.Out type="scale" />
			<Transition.Change interpolation="easeInOut" />
			<Transition.In type="fade" />
		</Transition.Sequence>
	);

	const VectorFocus = () => (
		<Image
			style={{
				height: 10,
				marginTop: 5,
				marginLeft: 8,
				resizeMode: 'contain'
			}}
			source={IconImage.vector} />
	)

	const Icon = (label, focused) => {
		if (label == 'Trang chủ')
			return <Layout middle >
				<Image
					style={{
						width: sizes._20sdp,
						height: sizes._20sdp,
						tintColor: focused ? '#80EDE6' : 'grey',
					}}
					source={TabIcon.home}
				/>
				{focused && VectorFocus()}
			</Layout>
		if (label == 'Lịch')
			return <Layout middle>
				<Image
					style={{
						width: sizes._20sdp,
						height: sizes._20sdp,
						tintColor: focused ? '#80EDE6' : 'grey',
					}}
					source={TabIcon.schedule}
				/>
				{focused && VectorFocus()}

			</Layout>
		if (label == 'Lịch sử')
			return <Layout middle>
				<Image
					style={{
						width: sizes._20sdp,
						height: sizes._20sdp,
						tintColor: focused ? '#80EDE6' : 'grey',
					}}
					source={TabIcon.chat}
				/>
				{focused && VectorFocus()}
			</Layout>
		if (label == 'Tài khoản')
			return <Layout middle>
				<Image
					style={{
						width: sizes._22sdp,
						height: sizes._22sdp,
						resizeMode: 'contain',
						tintColor: focused ? '#80EDE6' : 'grey',
					}}
					source={TabIcon.person}
				/>
				{focused && VectorFocus()}
			</Layout>
	}

	return (
		<Transitioning.View
			ref={ref}
			transition={transition} >
			<View style={{
				flexDirection: 'row', backgroundColor: "#fff",
				height: 70, alignItems: "center",
				marginBottom: 10,
			}}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
								? options.title
								: route.name;

					const isFocused = state.index === index;
					const onPress = () => {
						ref.current.animateNextTransition();
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
						});
						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};
					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};
					return (
						<TouchableOpacity
							key={'index' + index.toString()}
							accessibilityRole="button"
							// accessibilityStates={isFocused ? ['selected'] : []}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={{ flex: 1, padding: 10 }}
						>
							{Icon(label, isFocused)}
						</TouchableOpacity>
					);
				})}
			</View>
		</Transitioning.View>
	);
}