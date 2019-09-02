import React from 'react'
import RoomsFillter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";

function RoomsContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <RoomsFillter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    );
}

export default withRoomConsumer(RoomsContainer);

// //second approach
// import React from 'react';
// import RoomsFillter from "./RoomsFilter";
// import RoomsList from "./RoomsList";
// import { RoomConsumer } from "../context";
// import Loading from "./Loading";

// export default function RoomsContainer() {
//     return (
//         <RoomConsumer>
//             {
//                 (value) => {
//                     console.log(value)

//                     const {loading, sortedRooms, rooms} = value

//                     if (loading) {
//                       return  <Loading />
//                     }
//                     return (
//                         <div>
//                             Hello from RoomsContainer
//                             <RoomsFillter rooms={rooms} />
//                             <RoomsList rooms={sortedRooms} />
//                         </div>
//                     );
//                 }
//             }
//         </RoomConsumer>
//     )
// }



