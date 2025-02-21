import React, { useCallback, useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { BackspaceOutlined } from '@mui/icons-material';

const KeyboardDisplay = ({ setInput, input, setDidSubmit, letters, validWords, setWin, correctWord, setMessage, enterPressed, setEnterPressed, setIsInvalid, currRow }) => {

  const [stallType, setStallType] = useState(false);

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ]

  //for timing purposes
  const [colorDict, setColorDict] = useState({'A': '','B': '','C': '','D': '','E': '',
                                              'F': '','G': '','H': '','I': '','J': '',
                                              'K': '','L': '','M': '','N': '','O': '',
                                              'P': '','Q': '','R': '','S': '','T': '',
                                              'U': '','V': '','W': '','X': '','Y': '',
                                              'Z': ''});


  const handleButton = useCallback(async (letter) => {
    if(!stallType){
      const AtoZ = /^[A-Za-z]+$/; //helps check if input is alphabet
      if(letter === '{bksp}' || letter === 'BACKSPACE'){
        setInput(input.slice(0, input.length - 1))
      }else if(letter === '{enter}' || letter === 'ENTER'){
        if(input.length === 5 && validWords.length !== 0){
          if(correctWord === input){
            setWin(true);
            setDidSubmit(true);
            setMessage('You Win!')
            setEnterPressed(!enterPressed)
            setStallType(true);
          }else if(validWords.includes(input.toLowerCase())){
            setDidSubmit(true);
            setStallType(true);
            await timeout(1500);
            if(currRow < 5){
              setStallType(false);
            }
          }else{
            setMessage('Not in word list')
            setEnterPressed(!enterPressed)
            setIsInvalid(true);
            await timeout(100);
            setIsInvalid(false);
          }
        }

        if(input.length !== 5){
          setMessage('Not enough letters');
          setEnterPressed(!enterPressed);
          setIsInvalid(true);
          await timeout(100);
          setIsInvalid(false);
        }
      }else if(input.length < 5 && letter.match(AtoZ)){
        setInput(input + letter);
      }
    }
  }, [correctWord, enterPressed, input, setDidSubmit, setEnterPressed, setStallType, stallType, setInput, setIsInvalid, setMessage, setWin, validWords, currRow]);

  const changeKeyColor = useCallback(async () => {
    await timeout(1500);
    setColorDict(letters);
  }, [letters]);

  const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  useEffect(() => {
    async function handleKeyDown(e) {
      if((64 < e.keyCode && e.keyCode < 91) || e.keyCode === 8 || e.keyCode === 13){
        handleButton(e.key.toUpperCase());
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
    
  }, [input, enterPressed, handleButton, stallType]);

  useEffect(() => {
    changeKeyColor();
  }, [letters, changeKeyColor])

  useEffect(() => {
    if(currRow > 5){
      setStallType(true);
      setMessage(correctWord);
    }
  }, [currRow, setStallType, setMessage, correctWord])
  
  return (
    <Stack marginTop='57px'>
      <Stack direction='row' className='letter-row'>
        {keys[0].map((letter) => (
          <button key={letter} onClick={() => handleButton(letter)} 
            className={`letter-keys ${colorDict[letter]}`} 
          >
            {letter}
          </button>
        ))}
      </Stack>
      <Stack direction='row' className='letter-row'>
        {keys[1].map((letter) => (
          <button key={letter} onClick={() => handleButton(letter)} 
            className={`letter-keys ${colorDict[letter]}`} 
          >
          {letter}
        </button>
        ))}
      </Stack>
      <Stack direction='row' className='letter-row'>
        <button onClick={() => handleButton('{enter}')} className='spcl-key'>
          ENTER
        </button>
        {keys[2].map((letter) => (
          <button key={letter} onClick={() => handleButton(letter)} 
            className={`letter-keys ${colorDict[letter]}`} 
          >
          {letter}
        </button>
        ))}
        <button onClick={() => handleButton('{bksp}')} className='spcl-key'>
          <BackspaceOutlined/>
        </button>
      </Stack>
    </Stack>
    
  )
}

export default KeyboardDisplay