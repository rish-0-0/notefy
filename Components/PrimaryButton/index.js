import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function ({onPress, labelStyle, label, containerStyle}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.container, ...containerStyle}}>
      <Text style={{...styles.text, ...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 64,
    marginLeft: '10%',
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 4,
    backgroundColor: '#1976d2',
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 16,
    fontSize: 14,
    color: 'white',
  },
});
