import React, {FC, useState} from 'react';
import {socket} from "../App";

interface InterItem {
    type:string,
    desc:string,
    row:string,
    col:string
}
export const Item:FC<InterItem> = ({type,desc,row,col}) => {
    const [showButtons,setShowButtons] = useState(false);
    const deleteBlock = () =>{
        const Data = {
            row,
            column:col,
        };
        socket.emit('removeFromMatrix', Data);
    }
    const upBlock= () => {
        const Data = {
            r1:row,
            c1:col,
            r2:(parseInt(row)-1).toString(),
            c2:col,
        };
        socket.emit('updateMatrix', Data);
    }
    const downBlock= () => {
        const Data = {
            r1:row,
            c1:col,
            r2:(parseInt(row)+1).toString(),
            c2:col,
        };
        socket.emit('updateMatrix', Data);
    }
    const rightBlock= () => {
        const Data = {
            r1:row,
            c1:col,
            r2:row,
            c2:(parseInt(col)+1).toString(),
        };
        socket.emit('updateMatrixColumns', Data);
    }
    const leftBlock = () => {
        const Data = {
            r1:row,
            c1:col,
            r2:row,
            c2:(parseInt(col)-1).toString(),
        };
        socket.emit('updateMatrixColumns', Data);
    }
    return (
        <div className="Item_Content" onMouseEnter={()=>setShowButtons(true)} onMouseLeave={()=>setShowButtons(false)}>
            {showButtons &&
                <div className="rowButtons">
                    <div className="delete" onClick={deleteBlock}>X</div>
                    <div className="move" onClick={upBlock}>Up</div>
                    <div className="move" onClick={downBlock}>Do</div>
                    <div className="move" onClick={leftBlock}>Le</div>
                    <div className="move" onClick={rightBlock}>Ri</div>
                </div>
            }
            <div className={`Item-type ${type}`}>{type}</div>
            <div className="Item-desc">{desc}</div>
        </div>
    );
};

