# expo-image-cache

Image Cache for React Native Expo.

## Install

```bash
npm install --save @sk39/expo-image-cache
```

## Usage

```jsx
import React, { Component } from 'react'

import {CacheImage} from "@sk39/expo-image-cache"

class Example extends Component {
  render () {
    const source = {uri: "https://picsum.photos/510/300?random"}
    return (
         <CacheImage source={source}/>
    )
  }
}
```

## License

MIT © [sk39](https://github.com/sk39)
