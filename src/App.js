import React, { useEffect, useState } from 'react'
import WebFont from 'webfontloader'
import './App.css'

import SixRows from './components/SixRows'
import NavBar from './components/NavBar'
import KeyboardDisplay from './components/KeyboardDisplay'
import Message from './components/Message'

//wordle data from local file
let links = ['./valid-wordle-words.md', './wordle-list.md']

const App = () => {
  const [input, setInput] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);
  const [win, setWin] = useState(false);
  const [correctWord, setCorrectWord] = useState('');
  const [letters, setLetters] = useState({'A': '','B': '','C': '','D': '','E': '',
                                          'F': '','G': '','H': '','I': '','J': '',
                                          'K': '','L': '','M': '','N': '','O': '',
                                          'P': '','Q': '','R': '','S': '','T': '',
                                          'U': '','V': '','W': '','X': '','Y': '',
                                          'Z': ''});

  const [validWords, setValidWords] = useState([]);
  const [message, setMessage] = useState('');
  const [enterPressed, setEnterPressed] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const [currRow, setCurrRow] = useState(0);

  const fetchData = async () => {
    const files = await Promise.all(
      links.map((link) => fetch(link).then((res) => res.text()))
    );  
    setValidWords(files[0].split('\n'));
    const date = new Date();
    const todayDate = date.toString().slice(4, 15);
    var wordleArray = files[1].split('\r\n');
    for(var i = 0; i < wordleArray.length; i++){
      if(wordleArray[i].slice(0, 11) === todayDate){
        setCorrectWord(wordleArray[i].slice(-5));
        break;
      }
    }
  }

  useEffect(() => {
    fetchData();

    WebFont.load({
      google: {
        families: ['Chivo', 'Noto Serif']
      }
    });
  }, []);

  return (
    <React.Fragment>
      <NavBar setMessage={setMessage}/>
      <Message 
        message={message} setMessage={setMessage}
        enterPressed={enterPressed} correctWord={correctWord}
      />
      <SixRows 
        input={input} setInput={setInput} 
        didSubmit={didSubmit} setDidSubmit={setDidSubmit}
        letters={letters} setLetters={setLetters}
        validWords={validWords}
        correctWord={correctWord}
        win={win} setWin={setWin}
        isInvalid={isInvalid} 
        currRow={currRow} setCurrRow={setCurrRow}
      />
      <KeyboardDisplay 
        input={input} setInput={setInput} 
        setDidSubmit={setDidSubmit}
        letters={letters}
        validWords={validWords}
        correctWord={correctWord}
        setWin={setWin}
        setMessage={setMessage}
        enterPressed={enterPressed} setEnterPressed={setEnterPressed}
        setIsInvalid={setIsInvalid}
        currRow={currRow}
      />
    </React.Fragment>
  )
}

export default App