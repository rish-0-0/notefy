import React from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import Input from '../../Components/Input';
import PrimaryButton from '../../Components/PrimaryButton';

function NewNote(props) {
  return (
    <KeyboardAvoidingView
      style={styles.view}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Input label={'Header'} labelStyle={{}} />
      <Input label="Body" labelStyle={{}} multiline />
      <PrimaryButton label="Submit" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default NewNote;
