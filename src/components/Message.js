import React, { useEffect, useState, useCallback } from 'react'
import { Box } from '@mui/material'

const Message = ({ message, enterPressed, correctWord }) => {
  const [unhideClass, setUnhideClass] = useState('');

  const playMessage = useCallback(async () => {
    if(message === 'You Win!'){
      await timeout(1500);
    }
    setUnhideClass('unhide');
    await timeout(1000);
    if(message !== correctWord){
      setUnhideClass('');
    }
  }, [message, correctWord]);

  const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  useEffect(() => {
    if(message !== ''){
      playMessage();
    }
  }, [message, enterPressed, playMessage])
  

  return (
    <Box className={`message-popup ${unhideClass}`}>
      {message}
    </Box>
  )
}

export default Message