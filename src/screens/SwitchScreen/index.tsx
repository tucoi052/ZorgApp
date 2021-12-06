import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { ApplicationState } from "store/configureAction";
import { HomeStackContainer } from "navigation/stackHomeNavigation";
import { SettingStackContainer } from "navigation/stackSettingNavigation";
import { TabContainer } from "navigation/bottomTabsNavigation";
import { AuthStack } from "navigation/authStackNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigatorName, RouteName, RouteNameParam } from "constant";
import SplashScreen from "screens/SplashScreen";
const Stack = createStackNavigator();

interface State {
  isLoggedIn: boolean;
  loaded: boolean;
}
type UIProps = State;
const SwitchScreen = (props: UIProps) => {
  return (
    <Stack.Navigator headerMode="none">
      {
        !props.loaded ? (
          <Stack.Screen
            name={NavigatorName.SplashNavigator}
            component={SplashScreen}
          />
        ) :
        props.isLoggedIn? (
          <Stack.Screen
            name={NavigatorName.MainNavigator}
            component={TabContainer}
          />
        ) : (
          <Stack.Screen
            name={NavigatorName.AuthenNavigator}
            component={AuthStack}
          />
        )}
      </Stack.Navigator>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  isLoggedIn: state.AuthenticateState.isLoggedIn,
  loaded: state.ContextState.loaded,
});
const mapDispatchToProps = {};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SwitchScreen as any);
