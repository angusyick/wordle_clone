import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { HelpOutline, Settings } from '@mui/icons-material'
import InfoModal from './InfoModal'

const NavBar = ({ setMessage }) => {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <Stack direction='row' alignItems='center' id='navbar'>
      {/* <Menu sx={{ ml: '9px' }} className='svg_icons-nav'/> */}
      <Typography 
        id='title' paddingTop='5px' paddingBottom='10px' marginLeft='65px' 
        sx={{ textAlign: 'center'}}
      >
        Wordle
      </Typography>
      <Typography id='clone'>
        (clone)
      </Typography>
      <Stack direction='row'>
        <HelpOutline className='svg_icons-nav' onClick={() => setOpenInfo(true)}/>
        {/* <LeaderboardOutlined className='svg_icons-nav'/> */}
        <Settings className='svg_icons-nav' onClick={() => setMessage('Settings Page Coming Soon')}/>
      </Stack>
      <InfoModal openInfo={openInfo} setOpenInfo={setOpenInfo}/>
    </Stack>
  )
}

export default NavBar