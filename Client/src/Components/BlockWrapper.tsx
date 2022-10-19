import React from 'react';
import {Item} from "./Item";
import {Block} from "./Block";

interface IBlockWrapper{
    showProp:any,
    setShowProp:any;
    setShowIn:any;
    showIn:any;
    data:any;
    i:number;
    headerName:string;
}

const BlockWrapper:React.FC<IBlockWrapper> = ({setShowIn,setShowProp,showIn,showProp,data,i, headerName}) => {
    return (


        <div className="Board_Container-list">
            <div className="Board-header">{headerName}</div>
            <div className="Item_Wrapper">
                {data?.map((m:any,index:any) => {
                    if (m[i] != "")
                        return <Item type={m[i]?.priority} desc={m[i]?.desc} col={i.toString()} row={index.toString()}/>
                })}
            </div>
            {showIn == i+1 &&
                <Block showProp={showProp} setShowProp={setShowProp} setShowIn={setShowIn} showIn={showIn}
                       data={data}/>}
            {showIn == 0 &&
                <div className="Add-card" onClick={() => setShowIn(i+1)}>
                    + Add a card
                </div>
            }

        </div>
    );
};

export default BlockWrapper;