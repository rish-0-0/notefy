import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

export default function ({label, labelStyle, ...rest}) {
  return (
    <View style={styles.view}>
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
      <TextInput {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {},
  label: {},
});
