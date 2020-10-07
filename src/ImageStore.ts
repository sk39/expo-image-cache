import {CacheManager} from "react-native-expo-image-cache";
import _ from "lodash";

type ImageStoreResult = {
  localUri?: string,
  error?: boolean
}

export default class ImageStore {

  private static instance: ImageStore;

  private constructor() {
  }

  static getInstance() {
    if (!ImageStore.instance) {
      ImageStore.instance = new ImageStore();
    }
    return ImageStore.instance;
  }

  entry: {
    [name: string]: {
      listeners: ((res: ImageStoreResult) => void)[]
      localUri?: string | null | undefined;
      error?: boolean;
    }
  } = {};

  eventLister: {
    [name: string]: {
      listeners: ((arg?: any) => void)[]
    }
  } = {};

  private _downloaded(localUri: string | null | undefined, uri: string) {
    if (!this.entry[uri]) {
      return;
    }
    const _entry = this.entry[uri];
    _entry.localUri = localUri;
    _entry.error = (localUri == null)
    _entry.listeners.forEach(listener => listener({localUri: _entry.localUri, error: _entry.error}))
    _entry.listeners = [];
  }

  private _cache = (uri: string, lister: (res: ImageStoreResult) => void) => {
    if (!this.entry[uri] || this.entry[uri].error) {
      this.entry[uri] = {
        listeners: [lister],
        localUri: null
      }
      // console.log("get", uri)
      CacheManager.get(uri, {}).getPath()
        .then((localUri) => {
          this._downloaded(localUri, uri)
        })
        .catch(() => {
          this._downloaded(null, uri)
        })

    } else {
      const _entry = this.entry[uri];
      if (!_entry.localUri) {
        _entry.listeners.push(lister);
      } else {
        lister({localUri: _entry.localUri, error: _entry.error});
      }
    }
  }

  initialize() {

  }

  cache(uri: string): Promise<ImageStoreResult> {
    return new Promise((resolve => {
      this._cache(uri, ((res: ImageStoreResult) => resolve(res)));
    }))
  }

  cacheSync(uri: string): ImageStoreResult {
    const _entry = this.entry[uri];
    if (!_entry) {
      return {
        localUri: null,
        error: false
      };
    }

    return {
      localUri: _entry.localUri,
      error: _entry.error
    };
  }

  async clear() {
    this.entry = {}
    await CacheManager.clearCache();
  }

  addRefreshListener(lister: (soft?: boolean) => void) {
    const evName = "refresh"
    let entry = this.eventLister[evName];
    if (!entry) {
      entry = this.eventLister[evName] = {
        listeners: [lister]
      }
    } else {
      entry.listeners.push(lister);
    }

    // disposer
    return () => _.remove(entry.listeners, l => l === lister)
  }

  async refresh(soft?: boolean) {
    const evName = "refresh";
    if (!soft) {
      await this.clear();
    }
    const entry = this.eventLister[evName];
    if (entry) {
      _.each(entry.listeners, l => l(soft))
    }
  }
}
