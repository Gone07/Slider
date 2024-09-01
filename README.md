This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install node_modules and pods

First, you'll need to install the necessary dependencies for your React Native project. This involves setting up the JavaScript bundler, installing node modules, and installing CocoaPods if you're targeting iOS.

Install node_modules:

* Navigate to the root of your React Native project using your terminal.
* Run the following command to install all the required node modules

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

This command installs all the dependencies listed in your package.json file into the node_modules directory.

Install CocoaPods (for iOS projects):

* If your project includes an iOS app, you need to install the CocoaPods dependencies as well.
* Navigate to the ios directory inside your project:

```bash
cd ios

# Install pods
pod install
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
