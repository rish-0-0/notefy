import React from 'react';
import {Picker as RNPicker} from '@react-native-community/picker';

export default function ({selectedValue, style, onValueChange, items}) {
  return (
    <RNPicker
      selectedValue={selectedValue}
      style={style}
      onValueChange={onValueChange}>
      {items.map((item, index) => (
        <RNPicker.Item
          key={`picker-list-${index}`}
          label={item.label}
          value={item.value}
        />
      ))}
    </RNPicker>
  );
}
