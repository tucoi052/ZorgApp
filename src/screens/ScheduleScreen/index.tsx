import { IconImage, ImageAssets } from 'assets';
import { Button, Label, Layout } from 'components';
import { useColor } from 'hooks';
import React, { useEffect, useState } from 'react';
import { Image, FlatList, StatusBarIOS, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ContextAction } from 'store/context';
import ItemHistoryLayout from 'screens/Shared/ItemHistory';
import { ApplicationState } from 'store/configureAction';
import { ActionCreators as AuthAction } from 'store/authenticate';
import { _screen_height, _screen_width } from 'utils/sizes';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';
interface UIProps {
  navigation: any;
  listSchedule: any,
  isChangeStatus: any,
  GetSchedule: Function,
  FieldChange: Function,
  ChangeStatusSchedule: Function,
  Logout: any
}
const ScheduleScreen = (props: UIProps) => {
  const color = useColor();
  const isFocused = useIsFocused();
  const [userType, setUserType] = useState(2);
  useEffect(() => {
    props.GetSchedule();
    getType();
  }, [])

  const getType = async () => {
    let type = await AsyncStorage.getItem('userType') ?? 2;
    setUserType(type);
  }

  useEffect(() => {
    if (isFocused && props.isChangeStatus?.display){
      console.log(props.isChangeStatus?.display);
      props.GetSchedule();
    }
    else {
      props.FieldChange('isChangeStatus', undefined);
    }
  }, [isFocused, props.isChangeStatus])

  return (
    <Layout flex color={color?.PRIMARY_COLOR} >
      <Layout middle>
        <Image
          style={{ marginTop: 20 }}
          source={ImageAssets.logo} />
      </Layout>
      <FlatList
        data={props.listSchedule}
        renderItem={({ item }) => (
          <ItemHistoryLayout item={item} ChangeStatusSchedule={props.ChangeStatusSchedule}/>
        )} />
      {userType == 3 && <Button middle style={{ position: 'absolute', top: _screen_width * 0.15, right: 30 }}
        onPress={() => {
          props.Logout()
        }}>
        <Image
          source={IconImage.logout}
          style={{ width: 30, height: 30, tintColor: color?.BUTTON_COLOR }}
        />
        <Label color={color?.BUTTON_COLOR}>Đăng xuất</Label>
      </Button>}
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  listSchedule: state.ContextState.listSchedule,
  isChangeStatus: state.ContextState.isChangeStatus,
});
const mapDispatchToProps = {
  GetSchedule: ContextAction.GetSchedule,
  FieldChange: ContextAction.FieldChange,
  ChangeStatusSchedule: ContextAction.ChangeStatusSchedule,
  Logout: AuthAction.Logout,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ScheduleScreen as any);