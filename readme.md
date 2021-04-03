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
    rowCount={data.length}>
    {data.map(({ name, info }) => {
        return (<RowItem id={name} key={name} name={name} info={info} />);
    })}
</DraggableList>
```

**Note:** Make sure to give each row item a unique id. The lib uses this id to sense any changes to the order of items in the rendered list.

`onDragEnd`: This is a callback which is invoked as and when the user changes the order of the displayed items. You can listen to this, to update the component
state or to perform other side effects.

### Screencast

![example](gif/example_screencast.gif)

### Roadmap

1. Currently, the component does not adapt to elements with varying heights but rather assumes all elements to be of fixed height. I am actively working to support rows of varying heights. 
   
2. Support for horizontally scrolling list.

### Contributing

* Pull requests and questions are welcome. 😄

### Inspiration

This was inspired by William Candillon's fantastic [chrome example](https://www.youtube.com/watch?v=-39OEXk_mWc).

