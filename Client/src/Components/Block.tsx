import React, {FC, useState} from 'react';
import {arr, Priority} from "./Board";
import {socket} from "../App";

interface IBlock{
    showProp:any,
    setShowProp:any;
    setShowIn:any;
    showIn:any;
    data:any;
}

export const Block:FC<IBlock> = ({showProp,setShowProp, setShowIn,data, showIn}) => {
    const [value,setValue] = useState("");
    const [selected,setSelect] = useState<string|null>(null);

    const exit = ()=>{
        setValue("");
        setShowIn(0)
        setShowProp(1);
    }
    const sendToServerInfo = () => {
        if(selected){
            let priority = "";
            if(showProp==1) priority = Priority.low;
            else if(showProp==2) priority = Priority.medium;
            else if(showProp==3) priority = Priority.high;
            else if(showProp==4) priority = Priority.higest;
            const Data = {
                row: (parseInt(selected[0])-1).toString(),
                column: (parseInt(selected[2])-1).toString(),
                value,
                priority,
            };
            socket.emit('addToMatrix', Data);
            exit();
        }
    }
    return (
        <div className="wrapTextArea">
            <textarea className='Item_Content textarea' value={value} onChange={(e)=>setValue(e.target.value)} ></textarea>
            <div className='textarea_align-priority'>
                <div className={`Item-type ${showProp == 1 && Priority.low} disabled`} onClick={()=>setShowProp(1)}>{Priority.low}</div>
                <div className={`Item-type ${showProp == 2 && Priority.medium} disabled`} onClick={()=>setShowProp(2)}>{Priority.medium}</div>
                <div className={`Item-type ${showProp == 3 && Priority.high} disabled`} onClick={()=>setShowProp(3)}>{Priority.high}</div>
                <div className={`Item-type ${showProp == 4 && Priority.higest} disabled`} onClick={()=>setShowProp(4)}>{Priority.higest}</div>
            </div>
            <div className='align_row'>
                <div>
                    <button onClick={sendToServerInfo}>Create a task</button>
                    <button className='exit' onClick={exit}>X</button>
                </div>
                <div className="select-selected" >
                    <select id="row_col" onChange={(e)=>setSelect(e.target.value)} onLoad={(e)=>setSelect(e.currentTarget.value)} required={true} defaultValue={'none'}>
                        <option value="none" disabled={true} >Choose val</option>
                        {arr.filter(f=>f[2]==showIn).map(m=>{
                            if(!data) return <option value={m}>{m}</option>
                            else if(data[parseInt(m[0])-1][parseInt(showIn)-1]) return <option value={m} disabled={true}>{m}</option>
                            return <option value={m}>{m}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
};
