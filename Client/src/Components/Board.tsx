import React, {FC, useState} from 'react';
import {Item} from "./Item";
import {Block} from "./Block";
import BlockWrapper from "./BlockWrapper";


export const enum Priority {
    low = "low priority",
    medium = "medium priority",
    high = "high priority",
    higest = "highest priority",
}

export const arr = ["1,1", "1,2", "1,3", "2,1", "2,2", "2,3", "3,1", "3,2", "3,3"];
const headerNames = ['TO DO', 'IN PROGRESS', "COMPLETED"];

const Board: FC<{ data: any }> = ({data}) => {
    const [showIn, setShowIn] = useState(0);
    const [showProp, setShowProp] = useState(1);
    return (
        <div className='Board_Wrapper'>
            <div className="Board_Container">
                {
                    headerNames.map((x:string,i:number) =>{
                        return <BlockWrapper showProp={showProp} setShowProp={setShowProp} setShowIn={setShowIn} showIn={showIn} data={data} i={i} headerName={x}/>
                    })
                }
            </div>
        </div>
    );
};


export default Board;