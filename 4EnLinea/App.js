import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import inicio  from './Components/inicio.js';
import estadisticas  from './Components/estadisticas';
import nuevaPartida  from './Components/nuevaPartida';
import juego  from './Components/Juego';

const Stack = createStackNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationContainer >
        <Stack.Navigator  initialRouteName="inicio" screenOptions={{headerShown: false}}>
          <Stack.Screen name="inicio" component={inicio} />
          <Stack.Screen name="estadisticas" component={estadisticas} />
          <Stack.Screen name="nuevaPartida" component={nuevaPartida} />
          <Stack.Screen name="Juego" component={juego} />
        </Stack.Navigator>
      </NavigationContainer>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: "white"
  }
});
