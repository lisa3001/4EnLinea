import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, FlatList
} from 'react-native';
import axios from 'axios';

export default function estadisticas({ navigation }) {

    const[mostrar, setMostrar] = useState(0);
    const[top5, setTop5] = useState([]);
    const[jugadas, setJugadas] = useState([]);
    const[empates, setEmpates] = useState([]);

    useEffect(() => {
        (async () => {
            await axios
                .get("http://192.168.0.18:8080/partidas/victorias")
                .then((response) => {
                    setTop5(response.data);
                })
                .catch((error) => {
                console.error("There was an error!", error);
                });
            await axios
                .get("http://192.168.0.18:8080/partidas/cantidadJugadas")
                .then((response) => {
                    setJugadas(response.data);
                })
                .catch((error) => {
                console.error("There was an error!", error);
            });
            await axios
                .get("http://192.168.0.18:8080/partidas/empates")
                .then((response) => {
                    setEmpates(response.data);
                })
                .catch((error) => {
                console.error("There was an error!", error);
            });
        })();  
      },[]);

    const mostrarInfo = (id) => {
        if (id == 0){
            setMostrar(0);
        }
        else if (id == 1){
            setMostrar(1);
        }
        else{
            setMostrar(2);
        }
    }

    const Item = ({name, count}) => (
        <View style={styles.item}>
                <Text style={styles.itemText}>{name}</Text>
                <Text style={styles.itemText}>Victorias: {count}</Text>
        </View>   
    );

    const renderItem = ({ item }) => (
        <Item name={item._id} count={item.count}/>
    );

    const ItemJ = ({name, count}) => (
        <View style={styles.item}>
                <Text style={styles.itemText}>{name}</Text>
                <Text style={styles.itemText}>Cantidad de jugadas: {count}</Text>
        </View>   
    );

    const renderItemJ = ({ item }) => (
        <ItemJ name={item.ganador} count={item.movimientosRealizados}/>
    );

    const ItemE = ({name, name2, fecha, hora}) => (
        <View style={styles.item}>
                <Text style={styles.itemText}>{name} y {name2}</Text>
                <Text style={styles.itemText}>Fecha: {fecha} - {hora}</Text>
        </View>   
    );

    const renderItemE = ({ item }) => (
        <ItemE name={item.jugador1} name2={item.jugador2} fecha={item.fecha} hora={item.hora}/>
    );
         

  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <Text style={styles.backButton} title="Go back" onPress={() => navigation.goBack()}>Regresar</Text>
        <Text style={styles.title}>Estadísticas</Text>
      </View>
      <View style={styles.buttonsView}>
      <Pressable style={mostrar == 0 ? styles.buttonsStyle2 : styles.buttonsStyle} onPress={ () =>{mostrarInfo(0)}}>
        <Text style={styles.textButton}>Top 5 victorias</Text>
      </Pressable>
      <Pressable style={mostrar == 1 ? styles.buttonsStyle2 : styles.buttonsStyle} onPress={() =>{mostrarInfo(1)}}>
        <Text style={styles.textButton}>Ganador en menor cantidad de jugadas</Text>
      </Pressable>
      <Pressable style={mostrar == 2 ? styles.buttonsStyle2 : styles.buttonsStyle} onPress={() =>{mostrarInfo(2)}}>
        <Text style={styles.textButton}>Empates</Text>
      </Pressable>
      </View>
      <View style={styles.infoRow}>
        {mostrar == 0 ?
            <FlatList
            data={top5}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            />
            :null
        }
        {mostrar == 1 ?
            <FlatList
            data={jugadas}
            renderItem={renderItemJ}
            keyExtractor={item => item._id}
            />
            :null
        }
        {mostrar == 2 ?
            <FlatList
            data={empates}
            renderItem={renderItemE}
            keyExtractor={item => item._id}
            />
            :null
        }
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:"white",
    alignItems: 'center',
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
  inputView:{
    flexDirection: "row",
    marginTop: hp('1.5%'),
    height: hp('7%'),
    width: wp('80%'),
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 5,
    shadowOpacity: 4,
    elevation:6,
  },
  buttonsView:{
    width: wp('100%'),
    paddingBottom: hp('1%'),
    paddingTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsStyle:{
    height: hp('8%'),
    borderRadius:17,
    width: wp('90%'),
    backgroundColor:"#A5BE00",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  buttonsStyle2:{
    height: hp('8%'),
    borderRadius:17,
    width: wp('90%'),
    backgroundColor:"#03C6DB",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  textButton:{
    color:"white",
    fontWeight: 'bold',
    fontSize:16,
    textAlign:"center"
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
infoRow:{
    paddingBottom: hp('1%'),
    paddingTop: hp('1%'),
    marginTop: hp('1%'),
    height: hp('55%'),
    width: wp('95%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
    borderRadius:17,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: hp('6s%')
    },
    shadowRadius: wp('2%'),
    shadowOpacity: wp('2%'),
    elevation:wp('3%'),
},
item:{
    marginTop: hp('1%'),
    height: hp('10%'),
    width: wp('85%'),
    backgroundColor:"white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#03C6DB",
},
itemText:{
    color:"black",
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf:"center",
    marginTop: 5
},
});