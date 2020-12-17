import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PeliculasContext} from '../Context/PeliculasContext';



const Listado = ({navigation}) => {

    const {lista, setAlumno,eliminar} = useContext(PeliculasContext);
    


    return (
    
    <View style={styles.container}>
        <Header
            centerComponent={{ text: 'Cartelera de Peliculas', style: { color: '#fff', fontSize:20 } }}
            rightComponent={{ icon: 'person-add', color: '#fff', onPress:()=>{
                 setAlumno({
                     fecha:null,
                     nombre:"",
                     director:"",
                     genero:""
                 })   

                 navigation.navigate('Formulario',{status:"add"})

            }}}
            containerStyle={{backgroundColor:'gray'}}
        />
        <ScrollView>
        {
            lista.length>0
            ?
            lista.map((a,i)=>(
                <ListItem key={i} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{a.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{a.director}</ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={styles.buttons}>
                        <Ionicons name='ios-trash' size={30} color={'red'} onPress={()=>eliminar(a.fecha)}/>
                        <Ionicons name='md-create' size={30} color={'green'}  onPress={()=>{
                            setAlumno({
                                fecha:a.fecha.toString(),
                                nombre:a.nombre,
                                director:a.director,
                                genero:a.genero
                            })

                            navigation.navigate('Listado',{status:"edit"})
                        }}/>

                    </View>
                </ListItem>

            ))
            :
            <Text style={{marginTop:50, textAlign:'center', fontSize:20}}>No hay peliculas</Text>


        }


        </ScrollView>


    </View>
    );
}
 
export default Listado;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    buttons:{
        width:'25%', 
        flexDirection:'row', 
        justifyContent:'space-between'
    }
});