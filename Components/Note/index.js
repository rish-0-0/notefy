import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SecondaryButton from '../SecondaryButton';

export default class extends React.Component {
  render() {
    return (
      <View
        style={{
          ...styles.view,
          ...this.props.style,
          backgroundColor: this.props.category,
        }}>
        <Text style={styles.header}>{this.props.header}</Text>
        <Text style={styles.body}>{this.props.body}</Text>
        <SecondaryButton label="Remind me" onPress={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.9,
  },
});
