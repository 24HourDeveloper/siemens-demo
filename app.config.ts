export default{
  expo: {
    name: "siemens-demo",
    slug: "siemens-demo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.uncodedlifestyle.siemensdemo",
      infoPlist: {
        NSBluetoothAlwaysUsageDescription: "This app uses Bluetooth to connect to the Siemens device.",
        NSBluetoothPeripheralUsageDescription: "This app uses Bluetooth to connect to the Siemens device.",
        NSLocalNetworkUsageDescription: "The app requires access to the local network so it can..."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.INTERNET"
      ],
      package: "com.uncodedlifestyle.siemensdemo"
    },
    web: {
      bundler: "metro",
      output: "server",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      [
        "expo-router",
        {
          "origin": "http://localhost:8081/",
        }
      ],
      "react-native-ble-plx",
      "react-native-wifi-reborn",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "36255f88-2551-4161-816b-0598ce7dfc1b"
      }
    }
  }
}
