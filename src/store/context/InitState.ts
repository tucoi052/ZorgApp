import { Theme } from "utils/Theme";
import * as Yup from "yup";

export interface ContextState {
  isConnection: boolean;
  version?: string;
  theme?: any;
  locale?: string;
  displayIntro?: boolean;
  displaySplash?: boolean;
  message?: string;
  loaded?: boolean;
}

export const reportSchema = Yup.object().shape({
  title: Yup.string().required("Nhập tiêu đề!"),
  description: Yup.string().required("Nhập mô tả lỗi!"),
});

export const InitState: ContextState = {
  isConnection: true,
  theme: Theme.DARK,
  displaySplash: true,
  locale: "VN",
};
