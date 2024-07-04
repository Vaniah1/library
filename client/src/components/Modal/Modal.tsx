import React from "react"

interface ModalProps {
    toggleModal() : void
    content:JSX.Element
}


export const Modal:React.FC<ModalProps> = ({toggleModal,content}) =>{
    return(
        <div className="absolute z-10 flex justify-center w-full t-0 ">
            <div className="pl-[16px] pb-[16px] pr-[16px] z-20 w-full h-fit  items-center justify-center rounded-lg shadow-xl sticky [top:50%]   [transform:translate(-50%,-50%]">
                <h5 className="cursor-pointer [align-self:flex-start]" onClick={toggleModal}>X</h5>
                {content}
            </div>
        </div>
    )
}