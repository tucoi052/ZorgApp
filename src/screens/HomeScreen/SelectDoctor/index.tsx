import React, { useCallback, useRef, useState } from 'react';
import { Image, Text } from 'react-native';
import { Layout, Label, Button, TextInputUI } from 'components';
import styled from 'styled-components/native';
import { useColor, useDebouncedEffect } from 'hooks';
import { IconImage, ImageAssets } from 'assets';
import { sizes, _screen_height, _screen_width } from 'utils/sizes';
import { isObject } from 'formik/dist/utils';
import { ItemDoctorLayout } from 'screens/Shared';
import Animated, { Transition, Transitioning } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

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
const SelectDoctorLayout = (props: UIProps) => {
  const colors = useColor();
  const [search, setSearch] = useState('');
  const ref = useRef<any>();

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="scale" />
      <Transition.Change interpolation='easeInOut' />
      <Transition.In type='scale' />
    </Transition.Sequence>
  );

  useDebouncedEffect(() => {
    if (search.length == 0 || search.length > 3) {
      console.log(search);

    }
  }, [search], 700);

  const Item = () => (
    <Button middle style={{ width: _screen_width / 2 - 40 }} borderRadius={10} color='#fff'
      margin={10} paddingBottom={20} shadow>
      <Layout marginTop={20} centered middle padding={20} borderRadius={50} color={colors?.PRIMARY_COLOR}>
        <Image
          source={item.assert} />
      </Layout>
      <Label bold marginTop={10} centered>{item.title}</Label>
    </Button>
  )

  return (
    <Transitioning.View
      ref={ref}
      style={{ flex: 1, flexGrow: 1 }}
      transition={transition} >
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
        <Animated.ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <ItemDoctorLayout key={'1'} refItem={ref} transition={transition} />
          <ItemDoctorLayout key={'2'} refItem={ref} transition={transition}/>
          <ItemDoctorLayout key={'3'} refItem={ref} transition={transition}/>
          <ItemDoctorLayout key={'4'} refItem={ref} transition={transition}/>
        </Animated.ScrollView>

      </Layout>
    </Transitioning.View>
  );
};
export default SelectDoctorLayout;
function nativeMax(arg0: any, wait: any): any {
  throw new Error('Function not implemented.');
}

