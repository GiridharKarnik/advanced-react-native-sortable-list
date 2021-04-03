## advanced-react-native-sortable-list
A versatile list component that helps you generate a list whose items can be sorted.

This library uses and depends on the latest [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/) and [`react-native-reanimated (version 2.0.0)`](https://docs.swmansion.com/react-native-reanimated/) libraries.
Hence, to use this package your app must be compatible with those libraries.

### Usage

Wrap the rendered items with the `DraggableList` component imported from `advanced-react-native-sortable-list` like below.

```typescript jsx
<DraggableList
    onDragEnd={onDragEnd}
    rowHeight={100}
    data={data}>
    {/*This is just an example, you can render your list with which ever logic pleases you*/}
    {data.map(({ name, info, uri }) => {
        return (
            <RowItem id={name} key={name} name={name} uri={uri} info={info} />
        );
    })}
</DraggableList>
```

**Note:** Make sure to give each row item a unique id. The lib uses this id to sense any changes to the order of items in the rendered list.

### Component props

* `onDragEnd`: This is a callback which is invoked as and when the user changes the order of the displayed items. You can listen to this, to update the component
state or to perform other side effects. It returns an array which contains the data items in the updated order.
* `rowHeight`: The height of the rows within the list. This lib does not support lists with items of dynamic/variable height. I am definitely planning to support it in the future.
* `data`: An array of items which was originally used to render the list items.

### To run the example project

Alternative you can clone the repo and play with the provided example.

1. Clone the repo.
2. `cd example && yarn install`
3. `yarn start`
4. `yarn android` or `yarn ios` depending on your target device.

### Screencast

![example](gif/example_screencast.gif)

### Roadmap

1. Currently, the component does not adapt to elements with varying heights but rather assumes all elements to be of fixed height. I am actively working to support rows of varying heights. 
   
2. Support for horizontally scrolling list.

### Contributing

* Pull requests and questions are welcome. 😄

### Inspiration

This was inspired by William Candillon's fantastic [chrome example](https://www.youtube.com/watch?v=-39OEXk_mWc).

