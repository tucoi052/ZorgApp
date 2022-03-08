import { Label } from 'components';
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner, { SpinnerType } from 'react-native-spinkit';
import { sizes } from 'utils/sizes';
import LoadingManager from './LoadingManager';

const TIME_OUT = 60 * 1000;

export function showLoading(textLoading?: string) {
  const ref: any = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.showLoading(textLoading);
  }
}

export function updateTextLoading(textLoading: string) {
  const ref: any = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.updateTextLoading(textLoading);
  }
}

export function hideLoading() {
  const ref = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.hideLoading();
  }
}

interface IStates {
  isVisible: boolean;
  textLoading?: string;
}

interface IProps {
  spinnerSize?: number;
  spinnerType?: SpinnerType;
  spinnerColor?: string;
}

class LoadingModal extends PureComponent<IProps, IStates> {
  loadingTimeout: any = null;

  static defaultProps = {
    spinnerSize: 40,
    spinnerType: 'Circle',
    spinnerColor: '#fff',
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentWillUnmount() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
  }

  hideLoading = () => {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
    this.setState({ isVisible: false });
  };

  showLoading = (textLoading?: string) => {
    this.loadingTimeout = setTimeout(() => {
      this.setState({ isVisible: false });
    }, TIME_OUT);
    this.setState({ isVisible: true, textLoading: textLoading ?? '' });
  };

  updateTextLoading = (textLoading?: string) => {
    this.setState({ textLoading });
  }

  render() {
    return (
      this.state.isVisible && (
        <View style={styles.container}>
          <Spinner
            isVisible
            size={this.props.spinnerSize}
            type={this.props.spinnerType}
            color={this.props.spinnerColor}
          />
        </View>
      )
    );
  }
}

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.2,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textLoading: {
    color: '#fff',
    fontSize: sizes._20sdp,
    marginTop: sizes._30sdp,
    fontWeight: '600',
    textAlign: 'center',
  },
});
