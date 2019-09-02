import React from 'react'
import Hero from '../components/Hero';
import {Link} from 'react-router-dom';
import Banner from "../components/Banner";
import RoomsContainer from "../components/RoomsContainer";

const Rooms = () => {
    return (
        <>
        <Hero hero="roomsHero">
            <Banner title="our rooms" subtitle="" >
                <Link to="/" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <RoomsContainer></RoomsContainer>
        </>
    )
}

export default Rooms
