import React, {FC} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import * as RNMD from 'react-native-modal';

interface ModalProps
  extends Partial<Omit<RNMD.ModalProps, 'deviceWidth' | 'deviceHeight'>> {}

const Modal: FC<ModalProps> = props => {
  return (
    <RNMD.default
      {...props}
      customBackdrop={
        <TouchableWithoutFeedback onPress={props.onBackdropPress}>
          <View style={{flex: 1, backgroundColor: 'black'}} />
        </TouchableWithoutFeedback>
      }>
      {props.children}
    </RNMD.default>
  );
};

export default Modal;
