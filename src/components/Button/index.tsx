import React from 'react';
import styled from 'styled-components/native';
import Label from '../Label';
import {sizes} from 'utils/sizes';
import {TouchableOpacity} from 'react-native';

export interface ButtonUIProps {
  flex?: any;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  width?: number;
  height?: number;
  border?: boolean;
  borderWidth?: number;
  borderColor?: string;
  centered?: any;
  between?: boolean;
  middle?: any;
  color?: string;
  style?: any;
  direction?: string;
  children?: any;
  justifyContent?: string;
  borderRadius?: number;
  shadow?: boolean;
  onPress?: any;
  horizontal?: any;
  disable?: boolean;
  activeOpacity?: number;
}

const Button = (props: ButtonUIProps) => {
  const {
    flex,
    margin,
    marginVertical,
    marginHorizontal,
    marginTop,
    marginBottom,
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    width,
    height,
    border,
    borderWidth,
    borderColor,
    centered,
    between,
    middle,
    color,
    style,
    direction,
    justifyContent,
    borderRadius,
    shadow,
    children,
    onPress,
    horizontal,
    disable,
    activeOpacity,
  } = props;
  const styleComponent = [
    flex && {height: '100%', width: '100%'},
    margin && {margin: margin},
    marginVertical && {marginVertical: marginVertical},
    marginHorizontal && {marginHorizontal: marginHorizontal},
    marginTop && {marginTop: marginTop},
    marginBottom && {marginBottom: marginBottom},
    padding && {padding: padding},
    paddingVertical && {paddingVertical: paddingVertical},
    paddingHorizontal && {paddingHorizontal: paddingHorizontal},
    paddingTop && {paddingTop: paddingTop},
    paddingBottom && {paddingBottom: paddingBottom},
    paddingLeft && {paddingLeft: paddingLeft},
    paddingRight && {paddingRight: paddingRight},
    width && {width: width},
    height && {height: height},
    border && {borderWidth: 1, borderColor: 'gray'},
    borderWidth && {borderWidth},
    borderColor && {borderColor},
    color && {backgroundColor: color},
    centered && {justifyContent: 'center'},
    between && {justifyContent: 'space-between'},
    justifyContent && {justifyContent},
    direction && {flexDirection: direction},
    middle && {alignItems: 'center'},
    borderRadius && {borderRadius},
    horizontal && {flexDirection: 'row'},
    shadow && {
      shadowOpacity: 0.22,
      shadowRadius: sizes._15sdp,
      shadowColor: 'gray',
      shadowOffset: {height: 0, width: 0},
      elevation: 5,
    },
    style,
  ];

  if (typeof children === 'string') {
    return (
      <TouchableOpacity
        disabled={disable}
        activeOpacity={activeOpacity}
        onPress={() => {
          onPress();
        }}
        style={[styleComponent]}>
        <Label color={'white'}>{children}</Label>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      disabled={disable}
      activeOpacity={activeOpacity}
      onPress={() => {
        if (onPress) onPress();
      }}
      style={[styleComponent]}>
      {children}
    </TouchableOpacity>
  );
};
export default Button;
