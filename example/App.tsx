import React from 'react';
import ExampleList from './src';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <SafeAreaProvider style={styles.appContainer}>
      <ExampleList />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    padding: 20,
    paddingBottom: 0,
  },
});

export default App;
