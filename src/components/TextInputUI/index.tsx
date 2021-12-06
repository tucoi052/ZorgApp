import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  KeyboardType,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';

import {Layout, Label} from 'components';
import {IconImage} from 'assets';
import {sizes} from 'utils/sizes';
import useColor from 'hooks/useColor';
import {TypeField} from 'models/form';
export interface TextInputUIProps {
  title?: string;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  placeholder?: string;
  onChangeText?: (xText: string) => void;
  titlestyle?: any;
  contentstyle?: any;
  uistyle?: any;
  keyboardType?: KeyboardType;
  textValue?: string;
  errorMessage?: string;
  type?: TypeField;
  maxLength?: number;
  editable?: boolean;
  layoutstyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  icon?: any;
}
const color = useColor();

const TextInputUI = (props: TextInputUIProps) => {
  const {
    placeholder,
    keyboardType = 'default',
    type,
    errorMessage,
    onChangeText,
    onSubmitEditing,
    title,
    titlestyle,
    contentstyle,
    uistyle,
    textValue,
    maxLength,
    editable,
    layoutstyle,
    multiline,
    icon,
  } = props;
  const [value, setValueChange] = useState('');
  const [hiden, setHiden] = useState(false);
  return (
    <Container style={uistyle}>
      {title && (
        <Label paddingBottom={10} style={titlestyle}>
          {title}
        </Label>
      )}
      <Layout
        color="#F6F6F6"
        height={sizes._52sdp}
        borderRadius={sizes._10sdp}
        horizontal
        between
        middle
        style={layoutstyle}>
        {icon && <Layout paddingHorizontal={sizes._10sdp}>{icon}</Layout>}
        <TextInputStyled
          returnKeyLabel="Xong"
          returnKeyType="done"
          secureTextEntry={type === TypeField.PASSWORD && !hiden && true}
          keyboardType={keyboardType}
          style={contentstyle}
          maxLength={maxLength}
          editable={editable ?? true}
          value={textValue && textValue != '' ? textValue : value}
          onChangeText={(xText: string) => {
            setValueChange(xText);
            if (onChangeText) {
              onChangeText(xText);
            }
          }}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={color?.GRAY_COLOR}
          onSubmitEditing={onSubmitEditing}
        />
        {type === TypeField.PASSWORD && (
          <EyeStyled
            onPress={() => {
              setHiden(!hiden);
            }}>
            {hiden ? (
              <Image
                source={IconImage.eye}
                style={{
                  width: sizes._18sdp,
                  height: sizes._18sdp,
                  tintColor: '#AAA',
                }}
              />
            ) : (
              <Image
                source={IconImage.eye_slash}
                style={{
                  width: sizes._18sdp,
                  height: sizes._18sdp,
                  tintColor: '#AAA',
                }}
              />
            )}
          </EyeStyled>
        )}
      </Layout>
      {errorMessage && (
        <Label
          color="red"
          style={{fontSize: sizes._10sdp, fontStyle: 'italic'}}
          paddingTop={sizes._10sdp}>
          {errorMessage}
        </Label>
      )}
    </Container>
  );
};
export default TextInputUI;
const Container = styled.View``;

const TextInputStyled = styled.TextInput`
  flex: 1;
  color: #39434c;
  padding-vertical: 10px;
  height: 52px;
`;
const EyeStyled = styled.TouchableOpacity`
  padding: 10px;
`;
