import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FAB from '../../Components/FAB';
import getFiles from '../../helpers/readDir';
import {SwipeListView} from 'react-native-swipe-list-view';
import Note from '../../Components/Note';

function MyNotes({navigation}) {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFiles(
        'Notefy',
        (directory) => {
          console.log('Logging the dir', directory);
          setNotes([...directory]);
        },
        (e) => {
          console.log(e);
        },
      );
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.view}>
      <FAB
        iconFunc={(extra) => (
          <Icon name="plus" color="white" size={26} style={{...extra}} />
        )}
        onPress={() => {
          navigation.navigate('New Note');
        }}
        containerStyle={styles.containerStyle}
        iconStyle={styles.iconStyle}
      />
      <SwipeListView
        data={notes}
        renderItem={({item}) => (
          <Note
            header={item.header}
            body={item.body}
            category={item.category}
          />
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
        keyExtractor={(item, index) => `swipe-list-item-${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    ...StyleSheet.absoluteFillObject,
  },
  containerStyle: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    backgroundColor: '#6100ef',
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconStyle: {
    textAlign: 'center',
    marginTop: 27,
  },
});

export default MyNotes;
