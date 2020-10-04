7d2d-notes
==========

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


TODO: ↑ rewrite

-------

## Files required for build.

- 7daystodays ItemIcons
  - `public/imgs/items/*.png`
- css sprite of thumnails of ItemIcons
  - `public/thumbs.css`
  - `public/thumbs.png`

TODO: add support script.


## Firebasae

### init
```sh
$ docker-compose run --rm web /bin/sh
/app # yarn firebase login --no-localhost
# --- vist auth URL on any device and then paste auth code '? Paste authorization code here:'.

/app # yarn firebase init
```

### deploy
```sh
$ docker-compose run --rm web /bin/sh
/app # yarn firebase login --no-localhost
/app # yarn run build
/app # yarn firebase deploy
```

