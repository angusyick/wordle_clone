import React, { useState, useEffect, useCallback }from 'react';
import { Stack } from '@mui/material';
import Tile from './Tile';

const SingleRow = ({ word, haveGuessed, letters, setLetters, correctWord, win, setWin, isCurrRow, isInvalid}) => {
  const [letterColors, setLetterColors] = useState(['','','','','']);

  const calculateColor = useCallback(() => {
    var stack = '';
    var array = ['','','','',''];
    var dict = {...letters};
    for(var i = 0; i < 5; i++){
      if(correctWord[i] === word[i]){
        array[i] = 'green';
        stack = stack + word[i];
        dict[word[i]] = 'green';
      }
    }

    for(i = 0; i < 5; i++){
      if(correctWord.includes(word[i])){
        if (stack.split(word[i]).length < correctWord.split(word[i]).length){
          stack = stack + word[i];
          array[[i]] = 'yellow';
          if(dict[word[i]] !== 'green'){
            dict[word[i]] = 'yellow';
          }
        }
      }
      if(dict[word[i]] === ''){
        dict[word[i]] = 'gray';
      }
    }
    setLetters(dict);
    setLetterColors(array);
  }, [correctWord, setLetters, word, letters]);

  useEffect(() => {
    if(word.length === 5 && haveGuessed){
      calculateColor();
    }
  }, [word, haveGuessed, calculateColor])
  

  return (
    <Stack direction='row' alignItems='center' justifyContent='center' >
      {Array(5).fill().map((_, i) => (
        <Tile key={word[i] + i || i} rowIndex={i} letter={word[i]} 
          haveGuessed={haveGuessed} color={letterColors[i]}
          win={win} setWin={setWin}
          isWinWord={correctWord === word}
          isCurrRow={isCurrRow}
          isInvalid={isInvalid}
        />
      ))}
    </Stack>
  )
}

export default SingleRow