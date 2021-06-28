import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable
} from 'react-native';

export default function inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.buttonsView}>
      <Pressable style={styles.buttonsStyle2} onPress={() => navigation.navigate('nuevaPartida')}>
        <Text style={styles.textButton}>Jugar</Text>
      </Pressable>
      <Pressable style={styles.buttonsStyle} onPress={() => navigation.navigate('estadisticas')}>
        <Text style={styles.textButton}>Estadísticas</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor:"white"
  },
  logoRow:{
    height: hp('45%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    height: hp('60%'),
    width: wp('60%'),
    resizeMode: 'contain',
    marginBottom: -30,
  },
  buttonsView:{
    width: wp('100%'),
    paddingBottom: hp('1%'),
    paddingTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsStyle:{
    height: hp('10%'),
    borderRadius:17,
    width: wp('90%'),
    backgroundColor:"#03C6DB",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('4%'),
  },
  buttonsStyle2:{
    height: hp('10%'),
    borderRadius:17,
    width: wp('90%'),
    backgroundColor:"#A5BE00",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1.5%'),
  },
  textButton:{
    color:"white",
    fontWeight: 'bold',
    fontSize:20
  }

});