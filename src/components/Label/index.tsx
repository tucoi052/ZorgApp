import React from 'react';
import styled from 'styled-components/native';
import {sizes} from 'utils/sizes';

export interface LabelProps {
  flex?: any;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
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
  color?: string;
  bgColor?: string;
  gray?: any;
  upper?: any;
  capital?: any;
  size?: any;
  fontFamily?: any;
  bold?: any;
  style?: any;
  children?: any;
  borderRadius?: number;
  h1?: any;
  h2?: any;
  h3?: any;
  h4?: any;
  h5?: any;
  s1?: any;
  s2?: any;
  s3?: any;
  b1?: any;
  b2?: any;
  b3?: any;
  b4?: any;
  b5?: any;
  numberOfLines?: number;
  transparent?: any;
  onPress?: () => void;
}

const Label = (props: LabelProps) => {
  const {
    flex,
    margin,
    marginVertical,
    marginHorizontal,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
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
    color,
    bgColor,
    gray,
    upper,
    capital,
    size,
    fontFamily,
    bold,
    style,
    borderRadius,
    children,
    h1,
    h2,
    h3,
    h4,
    h5,
    s1,
    s2,
    s3,
    b1,
    b2,
    b3,
    b4,
    b5,
    transparent,
    numberOfLines,
    onPress,
  } = props;
  const styleComponent = [
    flex && {flex: 1},
    margin && {margin: margin},
    marginVertical && {marginVertical: marginVertical},
    marginHorizontal && {marginHorizontal: marginHorizontal},
    marginTop && {marginTop: marginTop},
    marginBottom && {marginBottom: marginBottom},
    marginLeft && {marginLeft: marginLeft},
    marginRight && {marginRight: marginRight},
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
    color && {color: color},
    bgColor && {backgroundColor: bgColor},
    borderRadius && {borderRadius},
    // (h1 || h2 || h3 || h4 || h5) && {fontFamily: MyFonts.header},
    h1 && {fontSize: sizes._28sdp, lineHeight: sizes._30sdp},
    h2 && {fontSize: sizes._22sdp, lineHeight: sizes._22sdp},
    h3 && {fontSize: sizes._16sdp, lineHeight: sizes._16sdp},
    h4 && {fontSize: sizes._14sdp, lineHeight: sizes._18sdp},
    h5 && {fontSize: sizes._12sdp, lineHeight: sizes._14sdp},
    // // sub-header
    // (s1 || s2 || s3) && {fontFamily: MyFonts.sub},
    s1 && {fontSize: sizes._13sdp},
    s2 && {fontSize: sizes._11sdp},
    s3 && {fontSize: sizes._10sdp},
    // // body
    // (b1 || b2 || b3) && {fontFamily: MyFonts.body},
    b1 && {fontSize: sizes._14sdp, lineHeight: sizes._20sdp},
    b2 && {fontSize: sizes._12sdp, lineHeight: sizes._18sdp},
    b3 && {fontSize: sizes._10sdp, lineHeight: sizes._16sdp},
    gray && {color: 'gray'},
    bold && { fontWeight: 'bold' },
    size && {fontSize: size},
    fontFamily && {fontFamily},
    centered && {textAlign: 'center'},
    upper && {textTransform: 'uppercase'},
    capital && {textTransform: 'capitalize'},
    style,
    numberOfLines && {numberOfLines: numberOfLines},
    transparent && {backgroundColor: 'transparent'},
  ];
  return (
    <Container
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styleComponent]}>
      {children}
    </Container>
  );
};
export default Label;

const Container = styled.Text``;
