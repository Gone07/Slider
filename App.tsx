import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Slider from './Slider';

// Libraries
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const data = [222, 333, 4544, 555];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.backgroundStyle}>
        <View style={styles.container}>
          <Slider
            data={data} // an array of numbers or string is required
            // trackColor="red" // optional, default '#FFFFFF'
            // trackFillColor="blue" // optional, default '#00A6F5'
            // thumbColor="green" // optional, default '#00A6F5'
            // thumbHoverColor="yellow" // optional, default '#00A6F5'
            // trackWidth={100} // optional, default is '100%'
            // showHover // optional, default is 'true'
            showTooltip // optional, default is 'false'
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#E1E7EA',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default App;
