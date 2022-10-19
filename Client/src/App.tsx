import React, {useEffect, useState} from 'react';
import './App.css';
import Board from "./Components/Board";
import {io} from "socket.io-client";

const ENDPOINT = 'http://localhost:1030';
export const socket = io(ENDPOINT);
export interface Data {
    priority: string;
    message:  string;
}
function App() {

    const [response, setResponse] = useState<any>(null);
    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });
        socket.on("newMatrix", data => {
            setResponse(data);
            console.table(data)
        });
        //return () => socket.disconnect();
    }, []);

  return (
    <div className="App">
      <Board data={response}/>
    </div>
  );
}

export default App;
