import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FAB from '../../Components/FAB';
import getFiles from '../../helpers/readDir';
import {SwipeListView} from 'react-native-swipe-list-view';
import Note from '../../Components/Note';
import deleteFile from '../../helpers/deleteFile';

import DatePicker from '@react-native-community/datetimepicker';

function onOpenDatePicker(onOpen, bool) {
  onOpen(bool);
}

function onCloseDatePicker(onClose, item) {
  onClose(item);
}

function MyNotes({navigation}) {
  const [notes, setNotes] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
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
        useNativeDriver={true}
        renderItem={({item}) => (
          <Note
            header={item.header}
            body={item.body}
            category={item.category}
            onRemindPress={(item) => {
              onOpenDatePicker(setShowPicker, true);
            }}
          />
        )}
        // leftOpenValue={75}
        // rightOpenValue={-75}
        renderHiddenItem={(rowData, rowMap) => (
          <TouchableOpacity
            onPress={() => {
              rowMap[`swipe-list-item-${rowData.index}`].closeRow();
              // console.log(rowMap);
              notes.splice(rowData.index, 1);
              setNotes([...notes]);
              deleteFile(
                rowData.item.path != undefined
                  ? rowData.item.path
                  : rowData.item.header,
                rowData.item.path != undefined ? true : false,
                () => {
                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Note Deleted', ToastAndroid.SHORT);
                  } else {
                    Alert.alert('Note deleted');
                  }
                },
                (e) => {
                  console.log('Message', e.message);
                },
              );
              console.log(rowData);
            }}>
            <View style={styles.hiddenContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.hiddenText}>Delete</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.hiddenText}>Delete</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        // leftActivationValue={100}
        // rightActivationValue={-50}
        onLeftActionStatusChange={() => console.log('left')}
        // onRightActionStatusChange={() => console.log('right')}
        leftActivationValue={75}
        disableLeftSwipe
        // rightActivationValue={-75}
        leftActionValue={Dimensions.get('window').width / 2}
        // rightActionValue={-Dimensions.get('window').width / 2}
        keyExtractor={(item, index) => `swipe-list-item-${index}`}
      />
      {showPicker && (
        <DatePicker
          value={new Date()}
          // mode={this.props.mode || 'dat'}
          mode="date"
          minimumDate={new Date()}
          is24Hour
          display="spinner"
          style={{flex: 1}}
          placeholderText={'Remind Me'}
          onChange={(e, date) => {
            if (e.type === 'dismissed') {
              // nothing
              console.log('time dismissed');
            } else if (e.type === 'set') {
              // do something
              console.log('date set', date.toDateString());
            }
            setShowPicker(false);
            setShowTimer(true);
          }}
        />
      )}
      {showTimer && !showPicker && (
        <DatePicker
          value={new Date()}
          // mode={this.props.mode || 'dat'}
          mode="time"
          is24Hour
          display="spinner"
          style={{flex: 1}}
          placeholderText={'Remind Me'}
          onChange={(e, date) => {
            if (e.type === 'dismissed') {
              // nothing
              console.log('time dismissed');
            } else if (e.type === 'set') {
              // do something
              console.log('time set', date.toTimeString());
            }
            setShowTimer(false);
            setShowPicker(false);
          }}
        />
      )}
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
  hiddenText: {
    textAlign: 'center',
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
});

export default MyNotes;
