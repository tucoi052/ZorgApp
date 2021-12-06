import Toast from "react-native-toast-message";

const showToast = (type?, text1?, text2?) => {
    Toast.show({
        type: type ?? 'info',
        text1: text1 ?? 'Thông tin !',
        text2: text2
    });
}

export default showToast;