
# Tuner app

## Structure

``` bash
/open-tuner/
├── android/
├── app/
├── assets/
├── components/
├── constants/
├── hooks/
├── scripts/
├── my-turbo-module/
│       ├── src/
│       └──package.json
├── package.json
└── README.md
```

## Development

it's much easier to handle the app from a clean docker enviroment:
``` bash
docker build -t tuner-test .
```
get inside and make a development build
``` bash
docker run -it -v ${PWD}:/app tuner-test /bin/bash

npx eas build --platform android --profile development --local
```

