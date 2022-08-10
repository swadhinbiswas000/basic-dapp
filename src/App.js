import './App.css';
import {useState, useEffect} from "react";

import { ChakraProvider } from '@chakra-ui/react'
import Form from "./components/Form.js";

function App() {

const [click, setClick] = useState("Not Clicked")

const handleClick = ()=>{
  setClick("Now it's clicked")
}

  return (
    <ChakraProvider>
      <Form />
    </ChakraProvider>
  );
}

export default App;
