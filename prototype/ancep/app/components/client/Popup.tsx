import { useEffect, useState } from "react";

export default function Popup(props:{visible:boolean, visibleChanged:Function, Footer:JSX.Element, title:string, children:JSX.Element }){

    const {visible, title, children, Footer, visibleChanged} = props;

    useEffect(()=>{


    },[])




    return(
        
      
        <div className={"fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] bg-black bg-opacity-[0.8]  max-h-full" + (visible ? "": " hidden")}>
            <div className="relative w-full flex flex-col justify-center h-full max-h-full ">
                    {/* modal */}
                <div className="relative bg-white rounded-lg shadow-xl h-[70%] flex flex-col   justify-between border w-full">
                    <div className="p-2 flex justify-between">
                        <h3 className="text-2xl">{title}</h3>
                        <button className="btn-primary h-[35px] w-[35px] flex justify-center items-center " onClick={()=>{visibleChanged?.(false) }}>X</button>
                    </div>

                    <div className="border h-full flex flex-col w-full max-h-full overflow-y-auto">
                        {children}
                    </div>

                    <div className="p-2">
                        {Footer}
                    </div>
                </div>

            </div>
        </div>
      
         
    )
}