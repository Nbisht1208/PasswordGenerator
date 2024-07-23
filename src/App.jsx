import { useState,useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length,setlength] = useState(8);
  const [numberAllowed,setnumberAllowed] = useState("False");
  const [characterAllowed,setcharacterAllowed] = useState("False");
  const [Password,setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if(numberAllowed) str+="0123456789";
    if(characterAllowed) str+="@#$%^&*(){}[]";
    
    for (let i = 1; i <=length; i++){
      console.log( str);
      let char = Math.floor(Math.random()*str.length +1);
      pass += str.charAt(char);1    
    }
    setPassword(pass);
    
    
  },[length ,numberAllowed,characterAllowed,setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
   passwordRef.current?.select();
   passwordRef.current?.setSelectionRange(0, 999);
   window.navigator.clipboard.writeText(Password)
 }, [Password])

  useEffect(()=> {passwordGenerator()},[length,numberAllowed,characterAllowed,passwordGenerator])
  
  return (
    
    <div className=' w-full max-w-xl  mx-96 rounded-lg px-8 py-16 my-4 text-orange-500 bg-gray-700 '>
      <span className='text-white text-center text-3xl  my-3 '>Password generator</span>
      <div className='flex shadow rounded-lg overflow-hidden text-lg mb-4'>
        <input
        type='text' 
        value={Password || ''}
        className='outline-none text-2xl w-full py-1 px-3 text-white bg-gray-950'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-xl  '>
        <div className='flex items-center px-2 gap-x-1'>
          <input type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}/>

          <label>length : {length}</label>
          <div className='flex items-center px-2 gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked={numberAllowed}
            id='nuberInput '
            onChange={()=>{
              setnumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Number </label>
          </div>
          <div className='flex items-center px-2 gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked={characterAllowed}
            id='characterInput'
            onChange={()=>{
              setcharacterAllowed((prev) => !prev)
            }}
            />
            <label>Character </label>
          </div>

        </div>
      </div>
     </div>

  )
}

export default App
