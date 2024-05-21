import React, { createContext, useState, useEffect } from 'react';
import { fetchCharactersByName } from '../services/api';
import { useParams } from 'react-router-dom';

export const SelectedMainCharacterContext = createContext();

export const SelectedMainCharacterProvider = ({ children }) => {
  const {charName} = useParams()
  const [allCharacters, setAllCharacters] = useState([]);

  useEffect(() => {
    console.log('charName', charName);
    const loadCharactersByName = async (charName) => {
      const chars = await fetchCharactersByName(charName);
      console.log('chars', chars);
      setAllCharacters(chars);
    };
    if (charName) {
      loadCharactersByName(charName);
    }
    console.log('allCharacters', allCharacters);
  }, [charName]);

  return (
    <SelectedMainCharacterContext.Provider value={{allCharacters, charName}}>
      {children}
    </SelectedMainCharacterContext.Provider>
  );
};