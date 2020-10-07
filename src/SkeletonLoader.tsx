import React, {PureComponent} from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import {StyleProp, ViewStyle} from "react-native";

interface Props {
  loading: boolean;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>
}

export default class SkeletonLoader extends PureComponent<Props> {

  static defaultProps = {
    backgroundColor: '#e9eaf8'
  };

  render() {
    const {loading, backgroundColor, style} = this.props;
    if (loading) {
      return (
        <SkeletonContent
          containerStyle={style}
          layout={[{
            flex: 1,
            width: "100%",
            borderRadius: 0,
          }]}
          boneColor={backgroundColor}
          highlightColor="white"
          isLoading={true}/>
      )
    } else {
      return this.props.children
    }
  }
}
