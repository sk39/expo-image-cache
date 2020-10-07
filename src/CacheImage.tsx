import React, {Component} from "react";
import {Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View} from "react-native";
import SkeletonLoader from "./SkeletonLoader";
import ImageStore from "./ImageStore";

interface Props {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  backgroundColor?: string;
}

interface State {
  localPath: string;
  loadError: boolean;
}

export default class CacheImage extends Component<Props, State> {

  static defaultProps = {
    backgroundColor: '#e9eaf8',
  };

  disposer: () => void;

  constructor(props: Props) {
    super(props);
    const imageStore = ImageStore.getInstance()
    const {source} = props;
    const uri = (source as any).uri;
    if (uri) {
      const entry = imageStore.cacheSync(uri)
      this.state = {localPath: entry.localUri, loadError: entry.error}
      if (!entry.localUri) {
        this.loadLocalPath(uri).then()
      }
    } else {
      this.state = {localPath: null, loadError: false}
    }

    this.disposer = imageStore.addRefreshListener(this.reload)
  }

  componentDidUpdate(prevProps: Props) {
    const {source} = this.props;
    const uri = (source as any).uri;
    if (uri && uri !== (prevProps.source as any).uri) {
      this.loadLocalPath(uri).then()
    }
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer();
    }
  }

  async loadLocalPath(uri: string) {
    const imageStore = ImageStore.getInstance()
    const entry = await imageStore.cache(uri);
    this.setState({localPath: entry.localUri, loadError: entry.error})
  }

  reload = (soft?: boolean) => {
    const {source} = this.props;
    const uri = (source as any).uri;
    if (!uri) {
      return;
    }

    if (soft && !this.state.loadError) {
      return;
    }

    this.loadLocalPath(uri).then()
  }

  render() {
    const {source, style, backgroundColor} = this.props;
    if ((source as any).uri) {
      const {localPath, loadError} = this.state;
      if (loadError) {
        return <View style={[styles.image, {backgroundColor: backgroundColor}]}/>
      }

      return (
        <SkeletonLoader
          backgroundColor={backgroundColor}
          loading={!localPath || localPath.length === 0}>
          <Image
            source={{uri: localPath}}
            style={[styles.image, style]}/>
        </SkeletonLoader>
      )
    }

    return (
      <Image source={source} style={[styles.image, style]}/>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  }
});
