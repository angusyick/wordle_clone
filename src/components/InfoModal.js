import React, { useEffect, useState } from 'react'
import { Box, Link, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const InfoModal = ({ openInfo, setOpenInfo}) => {
  const [hide, setHide] = useState('none')

  useEffect(() => {
    if(openInfo){
      setHide('')
      setOpenInfo(false);
    }
  }, [openInfo, setOpenInfo, setHide])
  

  return (
    <Box className='modal' display={`${hide}`}>
      <Box className='modal-content' 
        sx={{ marginTop: { sm: '150px', xs: '0px'}, height: { sm: '628.8px', xs: '100%'}}}
      >
        <CloseIcon id='close' className='svg_icons-nav' onClick={() => setHide('none')}/>
        <img alt='rules' id='rules' src='/Wordle-rules.PNG'/>
        <Typography id='disclaimer' sx={{marginLeft: { sm: '33px', xs: '16px' }}}>
          This webapp is an unofficial clone of NYT's Wordle. 
          Click 
          <Link href='https://www.nytimes.com/games/wordle/index.html' underline="hover" rel="noreferrer"> Here </Link> 
          to play the real Wordle.
        </Typography> 
      </Box>
    </Box>
  )
}

export default InfoModal