import { ImageSourcePropType, KeyboardType } from "react-native";
export enum FormMode {
  AddNew = 1,
  Edit = 2,
  Detail = 3,
}
export enum ControlType {
  Input = 1,
  Dropdown = 2,
  Checkbbox = 3,
  MultiCheckbox = 4,
}
export enum TypeField {
  TEXT = 'text',
  PASSWORD = 'password'
}

export interface Control {
  label: string;
  placeholder?: string;
  fieldName: string;
  type: TypeField;
  keyboardType?: KeyboardType;
  icon?: ImageSourcePropType | undefined;
}
export interface Row {
  controls: Control[];
}

export interface IForm {
  mode: FormMode;
  title: string;
  descriptions: string;
  rows: Row[];
}
export enum Stage {
  ACTIVE_ACCOUNT,
  ACTIVE_SUCCESS,
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  RESET_PASSWORD_OTP,
}
export interface FormStage {
  stage: Stage;
  title: string;
  descriptions: string;
  rows: Row[];
}
