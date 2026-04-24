
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





## Notes:

``` bash
"C:\Users\Not - 050\AppData\Local\Android\Sdk\ndk\26.1.10909125\toolchains\llvm\prebuilt\windows-x86_64\bin\llvm-readelf.exe" -l "C:\dev\open-tuner\android\app\build\intermediates\stripped_native_libs\debug\stripDebugDebugSymbols\out\lib\arm64-v8a\libtuner.so"
```