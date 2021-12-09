import * as React from 'react';
import { NavigationContainerRef, CommonActions } from '@react-navigation/native';

const navigationRef = React.createRef<any>();

const navigate = (routeName: string, params?: object) => {
  navigationRef.current?.navigate(routeName, params);
}

const reset = (routeName: string, params?: object) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
}

const pop = () => {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

export default {
  navigationRef,
  navigate,
  reset,
  pop,
};
