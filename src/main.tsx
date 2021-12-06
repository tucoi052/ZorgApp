import AsyncStorage from '@react-native-community/async-storage';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { setToken } from 'api/client';
import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import SwitchScreen from 'screens/SwitchScreen';
import store from 'store/configureStore';
import { ActionType as ContextType } from 'store/context';
import { ActionType as AuthenType } from 'store/authenticate';
import LoadingManager from 'components/loading/LoadingManager';
import LoadingModal from 'components/loading/LoadingModal';
import { sizes } from 'utils/sizes';
// import SplashScreen from 'react-native-splash-screen'
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};
enableScreens();
const AppLayout = () => {
  const loadingRef: any = React.useRef();

  const CheckLogin = () => {
    (async () => {
      let token = await AsyncStorage.getItem('accessToken');
      if (token && token !== '') {
        await setToken(token);
        store.dispatch({
          type: AuthenType.FIELD_CHANGE,
          fieldName: 'isLoggedIn',
          fieldValue: true,
        });
      }

    })();
  }

  const Splash = () => {
    setTimeout(() => {
      store.dispatch({
        type: ContextType.FIELD_CHANGE,
        fieldName: 'loaded',
        fieldValue: true
      });
    }, 1000);
  };

  useEffect(() => {
    Splash();
    loadingRef && LoadingManager.register(loadingRef);
    CheckLogin();
    return () => {
      LoadingManager.unregister(loadingRef);
    };
  }, [])

  // useEffect(() => {
  //   SplashScreen.hide();
  // })

  return (
    <Provider store={store}>
    <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <NavigationContainer theme={navTheme}>
        {/* <SafeAreaView style={{flex: 1}}> */}
        <SwitchScreen />
        {/* </SafeAreaView> */}
        <Toast />
        <LoadingModal ref={loadingRef} spinnerSize={sizes._60sdp} />
      </NavigationContainer>
    </Provider>
  );
};
let App = AppLayout;
export default App;
