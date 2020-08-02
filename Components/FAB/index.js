import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

export default function ({onPress, containerStyle, iconStyle, iconFunc}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.positioning, ...containerStyle}}>
      {iconFunc({...styles.icon, ...iconStyle})}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  positioning: {
    zIndex: 3,
  },
  icon: {},
});
