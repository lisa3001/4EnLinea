import React, { Component,useEffect } from 'react';
import {View,StyleSheet,Text,TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import { Table, Row, Rows,TableWrapper,Cell } from 'react-native-table-component';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Imagen from '../Imagen/Imagen';
// import Guiones from '../Guiones/Guiones';
// import Botonera from '../Botonera/Botonera';

export default class Juego extends Component {


    constructor(props) {
        super(props);
        this.state = {
        //   tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
          tableData: [
            ['0', '0', '0', '0','0', '0','0'],
            ['0', '0', '0', '0','0', '0','0'],
            ['0', '0', '0', '0','0', '0','0'],
            ['0', '0', '0', '0','0', '0','0'],
            ['0', '0', '0', '0','0', '0','0'],
            ['0', '0', '0', '0','0', '0','0'],
          ],
          jugadores: ["J1", "J2"],
          turno: '1',
          movimientos: [0,0],
          duracion: 0,
          inicio: false
        }
      }
  


    _alertIndex(index,cellIndex,data) {
        // Alert.alert(`Posiciones: ${index } ${cellIndex }`);
        // console.log(data)
        // this.obtenerJugadores()
        if(!this.state.inicio){
          this.state.duracion = new Date().getSeconds();
          this.obtenerJugadores()
          this.state.inicio = true
        }
        var d = this.calcularTiempo();
        const posiciones = this.jugar(index,cellIndex)
        // Alert.alert(`Posiciones: ${posiciones[0] } ${posiciones[1] }`);
        this.validarGane(posiciones[0],posiciones[1])
        this.cambiarTurno();
        this.forceUpdate();
        // console.log(this.state.tableData)


      }


      obtenerJugadores(){
        (async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('@session')
            var res = jsonValue != null ? JSON.parse(jsonValue) : null;
            if(res !== null) {
            // idUSario = res._id
              this.state.jugadores[0]=res.jugador1
              this.state.jugadores[1]=res.jugador2
            }
          } catch(e) {
            console.log(e);
          }
        })();


      }

      subirPartida(){

  

        var fecha = new Date()

        const partida = {
          jugador1: this.state.jugadores[0],
          jugador2: this.state.jugadores[1],
          fecha: fecha.toLocaleDateString('en-US'),
          hora: fecha.toLocaleTimeString('en-US') ,
          ganador: this.state.jugadores[parseInt(this.state.turno)-1],
          duracion: this.calcularTiempo()+" segundos",
          movimientosRealizados: this.state.movimientos[parseInt(this.state.turno)-1]
        }
        // console.log(partida)
        axios.post("http://192.168.0.18:8080/partidas/", partida)
        .then((response) => {
          // console.log(res.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
      

      }

      calcularTiempo(){
        return  new Date().getSeconds()-this.state.duracion ;
      }

      getPosicion(i,j){
        var posi=0
        if( this.state.tableData[i][j]!=0){return [i,j]}
        while(posi<=5){  
          if(this.state.tableData[posi][j]=='0'){
            posi++
          }else{
            posi-1
            break
          } 
        }
        if(posi<=0){
          return [i,j]
        }

        return [posi-1,j]
      }

      jugar(i,j){
        var posi=0
        if( this.state.tableData[i][j]!=0){return [i,j]}
        while(posi<=5){  
          // console.log("valor :",this.state.tableData[posi][j],"posi :",posi)
          if(this.state.tableData[posi][j]=='0'){
            posi++
            // console.log("suma")
          }else{
            posi-1
            // console.log("posix",posi)
            break
          } 
        }
        // console.log("posi",posi)
        if(posi<=0){
          this.state.tableData[i][j] = this.state.turno
          return [i,j]
        }
        this.state.tableData[posi-1][j] = this.state.turno

        return [posi-1,j]


      }

      // '#78B7BB'
      cambiarColor(i,j){
        var color
        if(this.state.tableData[i][j] == '1'){
          return   { width: 50, 
            height: 50, 
            backgroundColor: 'red',  
            borderRadius: 2 
          }
        }
        if(this.state.tableData[i][j] == '2'){
            return  { width: 50, 
              height: 50, 
              backgroundColor: 'yellow',  
              borderRadius: 2 
            }
          }
        else{
            return { width: 50, 
              height: 50, 
              backgroundColor:  '#78B7BB',  
              borderRadius: 2 
          }}
          

        }

      

      cambiarColorFicha(color){
        return { width: 50, 
          height: 50, 
          backgroundColor: color,  
          borderRadius: 2 
      }
      }

      cambiarTurno (){
        if (this.state.turno == '1'){
          this.state.movimientos[parseInt(this.state.turno)-1]++
          this.state.turno =  '2'
          return
        }else {
          this.state.movimientos[parseInt(this.state.turno)-1]++
          this.state.turno = '1'
        }
      }

      formatearPartida(){
        this.state.tableData = [
          ['0', '0', '0', '0','0', '0','0'],
          ['0', '0', '0', '0','0', '0','0'],
          ['0', '0', '0', '0','0', '0','0'],
          ['0', '0', '0', '0','0', '0','0'],
          ['0', '0', '0', '0','0', '0','0'],
          ['0', '0', '0', '0','0', '0','0'],
        ]
        this.state.jugadores= ['j1','j2']
        this.state.turno = '1'
        this.state.movimientos= [0,0]
      }

      validarGane(i,j){
        // console.log("ri")
        // abajo
        if(this.validarGaneAux(1,0,i,j,0) ){this.state.movimientos[parseInt(this.state.turno)-1]++;  Alert.alert(`Ganador de la partida: ${this.state.jugadores[parseInt(this.state.turno)-1]}  Movimientos: ${this.state.movimientos[parseInt(this.state.turno)-1]}`);this.subirPartida(); this.formatearPartida(); return}


        // //derecha
        if(this.validarGaneAux(0,1,i,j,0)){this.state.movimientos[parseInt(this.state.turno)-1]++;  Alert.alert(`Ganador de la partida: ${this.state.jugadores[parseInt(this.state.turno)-1]} Movimientos: ${this.state.movimientos[parseInt(this.state.turno)-1]} `);this.subirPartida(); this.formatearPartida(); return}

        // //izquierda
        if(this.validarGaneAux(0,-1,i,j,0)){this.state.movimientos[parseInt(this.state.turno)-1]++;  Alert.alert(`Ganador de la partida: ${this.state.jugadores[parseInt(this.state.turno)-1]}  Movimientos: ${this.state.movimientos[parseInt(this.state.turno)-1]}`);this.subirPartida(); this.formatearPartida(); return}

        // //diagonal izquierda
        if(this.validarGaneAux(-1,-1,i,j,0)){this.state.movimientos[parseInt(this.state.turno)-1]++;  Alert.alert(`Ganador de la partida: ${this.state.jugadores[parseInt(this.state.turno)-1]} Movimientos: ${this.state.movimientos[parseInt(this.state.turno)-1]} `);this.subirPartida(); this.formatearPartida(); return}

        // //diagonal derecha
        if(this.validarGaneAux(1,1,i,j,0)){this.state.movimientos[parseInt(this.state.turno)-1]++;  Alert.alert(`Ganador de la partida: ${this.state.jugadores[parseInt(this.state.turno)-1]} Movimientos: ${this.state.movimientos[parseInt(this.state.turno)-1]}`);this.subirPartida(); this.formatearPartida(); return}


        // //diagonal derechaMovimientos: ${this.state.movimientos[parseInt(this.state.turno)-1]}
        if(this.validarGaneAux(-1,1,i,j,0)){this.state.movimientos[parseInt(this.state.turno)-1]++;  Alert.alert(`Ganador de la partida: ${this.state.jugadores[parseInt(this.state.turno)-1]} Movimientos: ${this.state.movimientos[parseInt(this.state.turno)-1]}`);this.subirPartida(); this.formatearPartida(); return}

        // //diagonal derecha
        if(this.validarGaneAux(1,-1,i,j,0)){this.state.movimientos[parseInt(this.state.turno)-1]++;  Alert.alert(`Ganador de la partida: ${this.state.jugadores[parseInt(this.state.turno)-1]} Movimientos: ${this.state.movimientos[parseInt(this.state.turno)-1]}`);this.subirPartida(); this.formatearPartida(); return}

        // else {
        //   console.log("No hay gane")
        // }
      }




      validarGaneAux(i,j,posi,posj,contFichas){
        const cont = contFichas + 1 ;
        if(posi<0 || posj<0 || posi>5 || posj>6){ return false}
      
        // console.log("iteracion",posi,posj,cont,this.state.tableData[posi][posj])
        if(this.state.tableData[posi][posj]!=this.state.turno){
          // console.log("primer if")
          return false
        }
        if (cont==4) { 
          // console.log("tercer if")
           return true
         }
          if(this.state.tableData[posi][posj]==this.state.turno){
            // console.log("segundo if")
            return this.validarGaneAux(i,j,posi+i,posj+j,cont)
          }
          
          
          
          // else return false
          
      }


    render() {
        const state = this.state;



        // const state = this.state;
    const element = (data, index,cellIndex) => (
      <TouchableOpacity onPress={() => this._alertIndex(index,cellIndex,data)}>
      <View key={index,cellIndex} style={this.cambiarColor(index,cellIndex)}>
          <Text style={styles.btnText}></Text>
        </View>
      </TouchableOpacity>
    );

        return (
    <View style={styles.container}>
        <View>
        <Text style={styles.titulo}>4 en Línea</Text>
        <Text style={styles.tituloJugador}>Turno del jugador: {this.state.jugadores[parseInt(this.state.turno)-1]}</Text>
        </View>
        <View style={styles.imagen}>
            {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table> */}
               <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    // <Cell key={cellIndex} data={cellIndex === 0 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    <Cell key={cellIndex} data={element(cellIndex, index,cellIndex)} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        </View>
        {/* <View style={styles.guiones}>
      
            <Text>Hola</Text>
        </View>
        <View style={styles.botonera}>
            
            <Text>Hola</Text>
        </View> */}

    </View>
  );
    }
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
        justifyContent:'center',
        backgroundColor:'#03c6db',
        textAlign:'center',
        color:'white',
    },
    imagen:{
        flex:0.6,
        backgroundColor:'white',
        justifyContent: 'center',
    },
    text: { 
        margin: 6,
        textAlign:'center',
        // justifyContent: 'center',
        height:30 
    },
    head: { 
        height: 40, 
        backgroundColor: '#808B97' 
    },
    text: { 
        margin: 6 
    },
    row: { 
        height:55,
        flexDirection: 'row', 
        backgroundColor: 'white',

    },
    // btn: { width: 50, 
    //     height: 50, 
    //     backgroundColor: '#78B7BB',  
    //     borderRadius: 2 
    // },
    btnText: { 
    textAlign: 'center',
    color: '#fff',
    height:30,
 },
 tituloJugador:{
    color: '#fff',
    fontSize:20,
 }
    // botonera:{
    //     flex:0.3,
    //     backgroundColor:'#0075af',
    //     justifyContent: 'center',
    // },
    // guiones:{
    //     flex:0.1,
    //     backgroundColor:'#00325c',
    //     justifyContent: 'center',
    //     alignItems:'center',
    // },
})