import {useState, useCallback} from 'react';

export interface ViewMeasurements {
  y: number;
  x: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

const useComponentSize = (): [ViewMeasurements | undefined, any] => {
  const [size, setSize] = useState<ViewMeasurements>();

  const onLayout = useCallback((event) => {
    if (event.target.measure) {
      event.target.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setSize({x, y, width, height, pageX, pageY});
        },
      );
    }
  }, []);

  return [size, onLayout];
};

export default useComponentSize;
