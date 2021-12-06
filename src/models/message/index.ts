export enum MessageType {
  Success,
  Pending,
  Error,
  Info,
  Loading,
}
export type DialogType = "Loading" | "Error" | "Success" | "Info";
export interface DialogMessage {
  type?: DialogType;
  message?: string;
  display?: boolean;
}
