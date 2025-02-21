import React, { useState, useEffect } from 'react'
import Message from './Message'

const MessageQueue = ({ message, enterPressed }) => {
  const [messageQueue, setMessageQueue] = useState([]);
  const [tempCounter, setTempCounter] = useState(0);
  const [removeNode, setRemoveNode] = useState(true)

  var queue = []

  const popQueue = () => {
    console.log(tempCounter + ' after ' + messageQueue)
    setMessageQueue(messageQueue.slice(0, messageQueue.length - 1))
  }

  const addQueue = () => {
    setMessageQueue([tempCounter, ...messageQueue])
    console.log(tempCounter + ' before ' + messageQueue)
  }

  const sendMessage = async () => {
    if(message === 'You Win!'){
      await timeout(1500);
    }
    // var stack;
    // if(messageQueue.length !== 0){
    //   stack = [tempcounter, ...messageQueue];  
    // } else { 
    //   stack = [ tempcounter ];
    // }
    // tempcounter++;
    // setMessageQueue(stack)
    // await timeout(2000);
    // if(messageQueue.length !== 0){
    //   var stack2 = [...messageQueue];
    //   setMessageQueue(stack2.pop());
    // }
    messageQueue.unshift(message);
    setTempCounter(tempCounter + 1);
    // addQueue();
    // await timeout(1000);
    // messageQueue.pop();
    // popQueue();

  }

  const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  useEffect(() => {
    if(message){
      sendMessage();
    }
  }, [enterPressed])

  useEffect(() => {
    // console.log(messageQueue)
  }, [messageQueue, enterPressed])

  useEffect(() => {
    console.log(messageQueue)
    messageQueue.pop();
  }, [removeNode])
  
  

  return (
    <div>
      {messageQueue.length !== 0 && messageQueue.map((m, i) => (
        <Message key={m + tempCounter + i} message={m} index={i}
        enterPressed={enterPressed} 
        removeNode={removeNode} setRemoveNode={setRemoveNode}/>
      ))}
    </div>
  )
}

export default MessageQueue