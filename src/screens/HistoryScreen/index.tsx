import { ImageAssets } from 'assets';
import { Layout } from 'components';
import { useColor } from 'hooks';
import React, { useEffect } from 'react';
import { FlatList, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ContextAction } from 'store/context';
import ItemHistoryLayout from 'screens/Shared/ItemHistory';
import { ApplicationState } from 'store/configureAction';
import { _screen_height } from 'utils/sizes';
import { useIsFocused } from '@react-navigation/native';
interface UIProps {
  navigation: any;
  listHistory: any,
  GetHistory: Function

}
const HistoryScreen = (props: UIProps) => {
  const color = useColor();
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused)
    props.GetHistory()
  }, [isFocused])

  return (
    <Layout flex color={color?.PRIMARY_COLOR} >
      <Layout middle>
        <Image
          style={{ marginTop: 20 }}
          source={ImageAssets.logo} />
      </Layout>
      <FlatList
        data={props.listHistory}
        renderItem={({ item }) => (
          <ItemHistoryLayout item={item}/>
        )} />
    </Layout>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  listHistory: state.ContextState.listHistory,
});
const mapDispatchToProps = {
  GetHistory: ContextAction.GetHistory,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HistoryScreen as any);
