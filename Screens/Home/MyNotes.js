import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FAB from '../../Components/FAB';

function MyNotes({navigation}) {
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
