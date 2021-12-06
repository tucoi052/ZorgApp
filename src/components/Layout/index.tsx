import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

export interface ViewBoxUIProps {
  flex?: any;
  margin?: number;
  marginLeft?: number;
  marginRight?: number;
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
  centered?: boolean;
  between?: boolean;
  middle?: any;
  color?: string;
  style?: StyleProp<ViewStyle>;
  direction?: string;
  children?: any;
  justifyContent?: string;
  borderRadius?: number;
  shadow?: boolean;
  horizontal?: boolean;
  flexGrow?: number;
}

const Wrapper = (props: ViewBoxUIProps) => {
  const {
    flex,
    margin,
    marginRight,
    marginLeft,
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
    horizontal,
    flexGrow,
  } = props;
  const styleComponent = [
    flex && {flex: 1},
    flexGrow && {flexGrow: flexGrow},
    margin && {margin: margin},
    marginRight && {marginRight: marginRight},
    marginLeft && {marginLeft: marginLeft},
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
      shadowRadius: 15,
      shadowColor: 'gray',
      shadowOffset: {height: 0, width: 0},
      elevation: 5,
    },
    style,
  ];
  return <Container style={[styleComponent]}>{children}</Container>;
};
export default Wrapper;

const Container = styled.View``;
