import React from 'react';
import PeliculasProvider from './Context/PeliculasContext';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator1 from './Navigations/StackNavigator1'


export default function App() {
  return (
    <PeliculasProvider>
      <NavigationContainer>
        <StackNavigator1/>
      </NavigationContainer>
    </PeliculasProvider>
  );
}

