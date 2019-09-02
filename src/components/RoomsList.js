import React from 'react';
import Room from './Room';

export default function RoomsList({rooms}) {

    if (rooms.length === 0){
        return(
        <div className="empty-search">
            <h3>Unfortunatey no rooms matched your search parameters</h3>
        </div>
        )
    }
    return (
        <>
            <section className="roomsList">
               <div className="roomslist-center">{
                   rooms.map(i => {
                       return <Room key={i.id} room={i}></Room>
                   })
               }


               </div>            
            </section>
        </>
    )
}
