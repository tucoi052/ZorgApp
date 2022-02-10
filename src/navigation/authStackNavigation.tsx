import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ForgotPasswordScreen, NewPasswordScreen, OTPScreen, SignInScreen, SignUpScreen, WelcomeScreen } from "screens/AuthScreen";
import { RouteName } from "constant";
import { OPTS_COMMON } from "./navigationConfig";

const Stack = createStackNavigator();
type Props = {};

export class AuthStack extends React.Component<Props> {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          ...OPTS_COMMON,
        }}
      >
        <Stack.Screen
          name={RouteName.WELCOME}
          component={WelcomeScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name={RouteName.SIGN_IN}
          component={SignInScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name={RouteName.SIGN_UP}
          component={SignUpScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name={RouteName.FORGOTPASSWORD}
          component={ForgotPasswordScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name={RouteName.OTP}
          component={OTPScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name={RouteName.NEW_PASSWORD}
          component={NewPasswordScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    );
  }
}
