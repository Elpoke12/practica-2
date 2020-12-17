import React, {useContext} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PeliculasContext} from '../Context/PeliculasContext';
import Constants from 'expo-constants';
import firebase from '../Settings/ConfigFirebase'

const validations =Yup.object().shape({
    fecha:Yup.number().typeError('Año de Estreno').max(99999999,"Fecha no Valida").required('Obligatorio'),
    nombre:Yup.string().min(2,'Nombre muy corto').max(50,'Nombre muy largo').required('Obligatorio'),
    director:Yup.string().min(2,'Nombre muy corto').max(50,'Nombre muy largo').required('Obligatorio'),
    genero: Yup.string().nullable().required('Selecciona una genero')
})


export default function Formulario({route,navigation}){
    const {status} = route.params;
    const {alumno,lista,setAlumno,setLista}= useContext(PeliculasContext);

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Alumnos</Text>

            <Formik
                initialValues={alumno}
                onSubmit={(values,{resetForm})=>{
                     firebase.database().ref('Alumnos/'+alumno.fecha).update(alumno).then(()=>{
                         alert("Enviado")
                     })
                    const temporal = lista.filter(al=>al.fecha!=alumno.fecha);//!==
                    //alert('enviado')
                    setLista([...temporal,alumno]);
                    resetForm({
                        fecha:"",
                        nombre:"",
                        director:"",
                        genero:""
                    })
                    navigation.goBack();

                    console.log(lista) 
                }}
                validationSchema={validations}
                validate={(values)=>{
                    setAlumno(values)
                    console.log(alumno)
                }}
            >
            {
                ({handleChange, handleBlur, handleSubmit, setFieldValue, handleReset, errors, values})=>(
                    <View>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('fecha')}
                            onBlur={handleBlur('fecha')}
                            placeholder="Fecha"
                            value={values.fecha}
                            editable={status==="add"?true:false}
                        />
                        
                        {errors.fecha && <Text style={styles.texterror}>{errors.fecha}</Text>}

                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                            placeholder="Nombre"
                            value={values.nombre}                        

                        />

                        {errors.nombre && <Text style={styles.texterror}>{errors.nombre}</Text>}

                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('Director')}
                            onBlur={handleBlur('Director')}
                            placeholder="Director electronico"
                            value={values.Director}                        

                        />      

                        {errors.Director && <Text style={styles.texterror}>{errors.Director}</Text>}       

                        <View style={styles.picker}>
                            <Picker
                                mode="dialog"
                                style={{height:40, backgroundColor:'white'}}
                                selectedValue={values.genero}
                                onValueChange={ (v)=>
                                    setFieldValue('genero',v)
                                }
                            >
                                <Picker.Item color="grey" label="genero" value="" />
                                <Picker.Item color="black" label="Accion" value="Accion"/>
                                <Picker.Item color="black" label="Drama" value="Drama"/>
                                <Picker.Item color="black" label="Sci Fi " value="Sci Fi"/>
                            </Picker>
                        </View>

                        {errors.genero && <Text style={styles.texterror}>{errors.genero}</Text>}

                        <View style={{marginTop:20}}>
                            <Button
                                buttonStyle={styles.buttons}
                                onPress={handleSubmit}
                                title="Enviar"
                            />

                            {
                                status==="add"
                                &&
                                <Button
                                buttonStyle={styles.buttons}
                                onPress={handleReset}
                                title="Limpiar"
                                />

                            }
                        


                        </View>

                    </View>
                )


            }    
                
            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      margin:20,
      marginTop:Constants.statusBarHeight
   
    },
    texterror:{
      color:'red'
    },
    textinput:{
      borderRadius:10, 
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
      margin:5, 
      paddingLeft:15, 
      backgroundColor:'white',
      elevation: 5,
    },
    buttons:{
      backgroundColor:'gray', 
      color:'black', 
      marginTop:10, 
      borderRadius:10
    },
    header:{
      fontSize:20, 
      textAlign:'center', 
      marginBottom:40
    },
    picker:{
      margin:5, 
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: 'gray', 
      overflow: 'hidden',
      elevation: 5,
    }
  
  });
  