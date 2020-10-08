# expo-image-cache

Image Cache for React Native Expo.

[![NPM](https://img.shields.io/npm/v/@sk39/expo-image-cache.svg)](https://www.npmjs.com/package/@sk39/expo-image-cache)


![20201008_190924](https://user-images.githubusercontent.com/28267362/95445312-da2d9a00-0999-11eb-8a3b-3c9346daceb6.gif)

* Use [react-native-expo-image-cache](https://github.com/wcandillon/react-native-expo-image-cache).
* Load only once if many components display the same image at the same time.
* Show skeleton loader while loading. Use [react-native-skeleton-content](https://github.com/alexZajac/react-native-skeleton-content).

## Install

```bash
npm install @sk39/expo-image-cache
```

## Usage

### Props

| Props        | Default     | Description  |
| ------------- |:-------------:| -----:|
| source      | - | ImagSource |
| backgroundColor     | '#e9eaf8'      |  |
| onLoaded     |  null    |  |
| onError     | null      |  |

### CacheImage
```jsx
import React, { Component } from 'react'
import {CacheImage} from "@sk39/expo-image-cache"

class Example extends Component {
  render () {
    const source = {uri: "https://picsum.photos/510/300?random"}
    return (
        <View style={{width: 100, height: 60}}>
            <CacheImage source={source}/>
        </View>
    )
  }
}
```

### Clear cache

```ts
import {ImageStore} from "@sk39/expo-image-cache";

await ImageStore.getInstance().clear()
```

## License

MIT © [sk39](https://github.com/sk39)
