import React, {createContext, useState,useEffect} from 'react';
import firebase from '../Settings/ConfigFirebase';

export const PeliculasContext = createContext();


const peliculasProvider = (props)=>{
    const [pelicula, setPelicula] = useState({
        fecha:"",
        nombre:"",
        director:"",
        genero:""
    })

    const [lista, setLista]= useState([]);

    useEffect(()=>{
        firebase.database().ref('peliculas').on('value', snapshot=>{
            let peliculasLista=[];
            snapshot.forEach(row=>{
                peliculasLista.push({
                    fecha:row.key,
                    nombre:row.val().nombre,
                    director:row.val().director,
                    genero:row.val().genero
                })
            })
            setLista(peliculasLista)
        })
    },[])




    const eliminar =(id)=>{
        firebase.database().ref('peliculas/'+id).set(null).then(()=>{
            alert("Eliminado")
        })

        const temporal = lista.filter((item)=>{
            return item.fecha!== id;
        })
        setLista(temporal)
    }
    return(
        <PeliculasContext.Provider
            value={{
                pelicula,
                lista,
                setPelicula,
                setLista,
                eliminar
            }}
        >
            {props.children}

        </PeliculasContext.Provider>
    )
}

export default peliculasProvider;