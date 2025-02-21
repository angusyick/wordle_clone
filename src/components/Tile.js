import { Box } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react'

const Tile = ({ rowIndex, letter, haveGuessed, color, win, isCurrRow, isWinWord, isInvalid}) => {

  const [flip, setFlip] = useState('');
  const [bulgeSize, setBulgeSize] = useState('');
  const [bulgeBorder, setBulgeBorder] = useState('')
  const [winAnimation, setWinAnimation] = useState('')
  const [notValidAnimation, setNotValidAnimation] = useState('')
  const [colorClass, setColorClass] = useState('gray');

  const addFlipClass = useCallback(async () => {
    await timeout(250 * rowIndex);
    setFlip('flip-animation');
  }, [rowIndex]);

  const addColorClass = useCallback(() => {
    if(color){
      setColorClass(`${color}`);
    }
  },[color]);

  const addBulgeClass = useCallback(async () => {
    setBulgeSize('bulge-animation-size');
    setBulgeBorder('bulge-animation-border');
    await timeout(100);
    setBulgeSize('');
  }, []);

  const addWinAnimation = useCallback(async() => {
    await timeout(1500);
    await timeout(100 * (rowIndex));
    setWinAnimation('win-animation');
    await timeout(150);
    setWinAnimation('');
  }, [rowIndex]);

  const addNotValidAnimation = useCallback(async () => {
    setNotValidAnimation('not-valid-animation');
    await timeout(600);
    setNotValidAnimation('');
  }, []);

  const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  useEffect(() => {
    if(haveGuessed){
      addFlipClass();
    }
    if(color){
      addColorClass();
    }
  }, [haveGuessed, color, addColorClass, addFlipClass])

  useEffect(() => {
    if(letter){
      addBulgeClass();
    } else{ 
      setBulgeBorder('');
    }
  }, [letter, addBulgeClass, setBulgeBorder])

  useEffect(() => {
    if(isWinWord && win){
      addWinAnimation();
    }
  }, [isWinWord, win, addWinAnimation])
  
  useEffect(() => {
    if(isInvalid && isCurrRow){
      addNotValidAnimation();
    }
  }, [isInvalid, isCurrRow, addNotValidAnimation])

  return (
    <Box className={`whole-tile ${flip} ${bulgeSize} ${winAnimation} ${notValidAnimation}`}
      sx={{width: { sm: '62px', xs: '52px'}, height: { sm: '62px', xs: '52px'}, lineHeight: { sm: '62px', xs: '52px'}}}
    >
      <div className={`flip-box`}>
        <div className={`tile-front ${bulgeBorder}`}>
            {letter}
        </div>  
        <div className={`tile-back ${colorClass}`}>
            {letter}
        </div>
      </div>
    </Box>
  )
}

export default Tile