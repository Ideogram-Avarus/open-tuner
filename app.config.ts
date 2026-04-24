
const profile = process.env.EAS_BUILD_PROFILE ?? 'local';


const get_package_name = () => {
  if (profile === 'development') return 'com.ideogram.opentuner.dev';
  else return 'com.ideogram.opentuner';
}

const getAppName = () => {
  if (profile === 'development') return 'open-tuner (dev)';
  return 'open-tuner';
};


const build_config = () => {
  console.log("⚙️ Building app for environment: ", process.env.EAS_BUILD_PROFILE);
  return {
      "expo": {
      "name": getAppName(),
      "slug": 'open-tuner',
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/images/icon.png",
      "scheme": "opentuner",
      "userInterfaceStyle": "automatic",
      "newArchEnabled": true,
      "ios": {
        "supportsTablet": true,
        "bundleIdentifier": get_package_name()
      },
      "android": {
        "permissions": ["RECORD_AUDIO"],
        "package": get_package_name(),
        "adaptiveIcon": {
          "backgroundColor": "#0f2d45",
          "foregroundImage": "./assets/images/android-icon-foreground.png",
          "backgroundImage": "./assets/images/android-icon-background.png",
          "monochromeImage": "./assets/images/android-icon-monochrome.png"
        },
        "edgeToEdgeEnabled": true,
        "predictiveBackGestureEnabled": false,
      },
      "web": {
        "output": "static",
        "favicon": "./assets/images/favicon.png"
      },
      "plugins": [
        "expo-router",
        [
          "expo-splash-screen",
          {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 200,
            "resizeMode": "contain",
            "backgroundColor": "#0f2d45",
            "dark": {
              "backgroundColor": "#082336"
            }
          }
        ]
      ],
      "experiments": {
        "typedRoutes": true,
        "reactCompiler": true
      },
      "extra": {
        "router": {},
        "eas": {
          "projectId": "e91ac036-e65c-419d-8a5a-ea294e1f35d6"
        }
      },
      "owner": "ta-de-pe"
    }
  }
}

const config = build_config();


export default config;