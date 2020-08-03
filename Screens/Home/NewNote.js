import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import Input from '../../Components/Input';
import PrimaryButton from '../../Components/PrimaryButton';
import writeToFile from '../../helpers/writeToFile';

function seperateUnderscore(string) {
  return string.split(' ').join('_');
}

function NewNote(props) {
  const [header, setHeader] = useState(null);
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  return (
    <ScrollView style={styles.view} keyboardDismissMode="interactive">
      <Input
        label={'Header'}
        labelStyle={{...styles.label}}
        value={header}
        maxLength={30}
        onChangeText={setHeader}
      />
      <Input
        label="Body"
        labelStyle={{...styles.label}}
        style={{...styles.textarea}}
        value={body}
        onChangeText={setBody}
        multiline
      />
      {success && <Text style={styles.success}>Done</Text>}
      {loading && <ActivityIndicator style={styles.loading} />}
      {error && <Text style={styles.message}>{error}</Text>}
      <PrimaryButton
        label="Submit"
        disabled={loading}
        onPress={() => {
          if (!header || !body) return;
          setLoading(true);
          writeToFile(
            seperateUnderscore(header),
            JSON.stringify({header: header, body: body}),
            () => {
              setLoading(false);
              setError(null);
              setSuccess(true);
            },
            (e) => {
              setLoading(false);
              setError(e.message);
              setSuccess(true);
            },
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  label: {},
  textarea: {},
  success: {
    textAlign: 'center',
    color: 'green',
    fontSize: 11,
    lineHeight: 14,
  },
  message: {
    textAlign: 'center',
    color: 'red',
    fontSize: 11,
    lineHeight: 14,
  },
  loading: {
    textAlign: 'center',
  },
});

export default NewNote;
