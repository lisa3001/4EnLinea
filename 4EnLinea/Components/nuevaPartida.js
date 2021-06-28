import React, { useState } from 'react';
import {View,StyleSheet,Text,Image,Button } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 export default function nuevaPartida({ navigation }) {
        const [jugador1, setJugador1] = useState('');
        const [jugador2, setJugador2] = useState('');

        const Jugar=async()=>{
            const jsonValue = {
                jugador1:jugador1,
                jugador2:jugador2            
            }

            await AsyncStorage.setItem('@session', JSON.stringify(jsonValue));
            navigation.navigate('Juego');
        }
        return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} title="Go back" onPress={() => navigation.goBack()}>Regresar</Text>
        <Text style={styles.title}>Nueva Partida</Text>
      </View>

        <View style={styles.imagen}>
        <View style={styles.inputs}>
        <FloatingLabelInput
        // style={styles.inputs}
        label={'Jugador 1'}
        value={jugador1}
        leftComponent={
          <Image
            style={{height: 30, width: 30}}
            source={{
              uri: 'https://image.flaticon.com/icons/png/512/38/38490.png',
            }}
          />
        }
        onChangeText={(val) => setJugador1(val)}
      />
              <FloatingLabelInput
        // style={styles.inputs}
        label={'Jugador 2'}
        value={jugador2}
        leftComponent={
          <Image
            style={{height: 30, width: 30}}
            source={{
              uri: 'data:image/png;base64,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',
            }}
          />
        }
        onChangeText={(val) => setJugador2(val)}
      />
      </View>
      <Button
        title="Jugar"
        onPress={() => Jugar()}
      />
        </View>

    </View>
  );
 }

const styles=StyleSheet.create({
    titulo:{
        textAlign:'center',
        fontSize:40,
        color:'white',
    },
    container:{
        flex:1,
        paddingTop:1,
        backgroundColor:'white',
        textAlign:'center',
        color:'white',
    },
    imagen:{
        flex:0.9,
        backgroundColor:'white',
        justifyContent: 'center',
    },
    text: { 
        margin: 6,
        textAlign:'center',
        // justifyContent: 'center',
        height:30 
    },
    inputs:{
        margin:10,
        // justifyContent:'space-between'
    },
    header:{
      height: hp('12%'),
      width: wp('100%'),
      backgroundColor:"#03C6DB",
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      paddingTop: 10,
      paddingLeft: 10,
      paddingBottom: 8,
  },
  backButton:{
      color:"white",
      fontSize: 15,
      fontWeight: 'bold'
  },
  title:{
      color:"white",
      fontWeight: 'bold',
      fontSize: 30,
      alignSelf:"center",
      marginTop: 5,
  },
})