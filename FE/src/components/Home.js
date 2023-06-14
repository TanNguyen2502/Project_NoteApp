import React from 'react'
import Folder from './Folder';
import Note from './Note';
import InputZone from './InputZone';

const Home = () => {
    return (
        <>
            <div className="h-[530px] mx-3 flex flex-row shadow-lg">
                <div className="basis-1/4 bg-white"> <Folder /> </div>
                <div className="basis-1/4 border-x-2 bg-white"> <Note /> </div>
                <div className="basis-2/4 bg-white"> <InputZone /> </div>
            </div> 
        </>
    )
}

export default Home