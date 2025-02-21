import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/material'

import SingleRow from './SingleRow'

const SixRows = ({ input, setInput, didSubmit, setDidSubmit, letters, setLetters, win, setWin, correctWord, isInvalid, currRow, setCurrRow}) => {
  const [words, setWords] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if(didSubmit){
      var dummy = words;
      dummy[currRow] = input;
      setWords(dummy);
      setCurrRow(currRow + 1);
      setInput('');
      setDidSubmit(false);
    }
  }, [didSubmit, input, setDidSubmit, setInput, currRow, setCurrRow, words])
  

  return (
    <Stack marginTop='60px'>
      {Array(6).fill().map((_, i) => (
        <SingleRow key={i} word={(i === currRow) ? input : words[i]} 
          haveGuessed={i < currRow} letters={letters} setLetters={setLetters}
          correctWord={correctWord}
          win={win} setWin={setWin}
          isCurrRow={i === currRow}
          isInvalid={isInvalid}
        />
      ))}
    </Stack>
  )
}

export default SixRows