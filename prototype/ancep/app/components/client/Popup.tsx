import { useEffect, useState } from "react";

export default function Popup(props:{visible:boolean, visibleChanged:Function, BodyContent:JSX.Element, Footer:JSX.Element, title:string }){

    const {visible, title, BodyContent, Footer, visibleChanged} = props;

    useEffect(()=>{


    },[])




    return(
        
      
        <div className={"fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]  max-h-full" + (visible ? "": " hidden")}>
            <div className="relative w-full flex flex-col justify-center h-full max-h-full">
                    {/* modal */}
                <div className="relative bg-white rounded-lg shadow h-[70%] flex flex-col justify-between border">
                    <div className="p-2 flex justify-between">
                        <h3>{title}</h3>
                        <button onClick={()=>{visibleChanged?.(false) }}>X</button>
                    </div>

                    <div className="border h-full flex">
                        {BodyContent}
                    </div>

                    <div className="p-2">
                        {Footer}
                    </div>
                </div>

            </div>
        </div>
      
         
    )
}