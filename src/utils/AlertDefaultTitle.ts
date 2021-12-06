import { Alert } from "react-native"

class AlertDefaultTitle {
    show = (message:string, titleLeft:string = "OK", actionLeft?:any, titleRight?:string, actionRight?:any, title?: string) => {
        let optionAction: any = []
        if (titleLeft) {
            optionAction.push({
                text: titleLeft,
                onPress: actionLeft
            })
        }

        if (titleRight) {
            optionAction.push({
                text: titleRight,
                onPress: actionRight
            })
        }

        Alert.alert(
            title? title: 'Thông báo',
            message,
            optionAction
        )
    }

    prompt = (message:string, titleLeft:string = "OK", actionLeft:any, titleRight:string, actionRight:any) => {
        let optionAction: any = []
        if (titleLeft) {
            optionAction.push({
                text: titleLeft,
                onPress: actionLeft
            })
        }

        if (titleRight) {
            optionAction.push({
                text: titleRight,
                onPress: actionRight
            })
        }

        Alert.prompt(
            'Thông báo',
            message,
            optionAction
        )
    }
}

const alertDefaultTitle = new AlertDefaultTitle()

export default alertDefaultTitle