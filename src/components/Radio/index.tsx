import React from "react";
import { View } from "react-native";

export const RadioButton = (props) => {
    return (
        <View style={[{
          height: 20,
          width: 20,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }, props?.style]}>
          {
            props?.selected ?
              <View style={{
                height: 10,
                width: 10,
                borderRadius: 6,
                backgroundColor: '#000',
              }}/>
              : null
          }
        </View>
    );
  }