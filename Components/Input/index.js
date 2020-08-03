import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

export default function ({label, labelStyle, containerStyle, style, ...rest}) {
  return (
    <View style={{...styles.view, ...containerStyle}}>
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
      <TextInput style={{...styles.input, ...style}} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  input: {
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
});
