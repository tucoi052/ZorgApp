import { HeaderStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
import React, { Component } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import { IconImage } from 'assets';
import { sizes } from 'utils/sizes';
export const OPTS_COMMON: StackNavigationOptions = {
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#FFF',
  },
  headerTintColor: '#010101',
  headerBackImage: () => (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        paddingVertical: 5,
      }}>
      <Image
        style={{ width: sizes._25sdp, height: sizes._25sdp }}
        source={IconImage.back}
      />
    </View>
  ),
};
