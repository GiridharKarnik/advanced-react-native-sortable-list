## advanced-react-native-sortable-list
A versatile list component that helps you generate a list whose items can be sorted.

This library uses and depends on the latest [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/) and [`react-native-reanimated (version 2.0.0)`](https://docs.swmansion.com/react-native-reanimated/) libraries.
Hence, to use this package your app must be compatible with those libraries.

### Running the example

Do the following to run the example.

1. Clone the repo.
2. `cd example && yarn install`
3. `yarn start`
4. `yarn android` or `yarn ios` depending on your target device.

### Screencast

![example](example/gif/example_screencast.gif)

### Roadmap

1. Currently, the component does not adapt to elements with varying heights but rather assumes all elements to be of fixed height. I am actively working to support rows of varying heights. 
   
2. Support for horizontally scrolling list.

### Inspiration

This was inspired by William Candillon's fantastic [chrome example](https://www.youtube.com/watch?v=-39OEXk_mWc).

