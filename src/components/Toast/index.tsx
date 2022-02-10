import Toast from "react-native-toast-message";

const showToast = (type?, text1?, text2?) => {
    Toast.show({
        type: type ?? 'info',
        text1: text1 ?? 'Thông tin !',
        text2: text2,
        visibilityTime: 3500
    });
}

export default showToast;