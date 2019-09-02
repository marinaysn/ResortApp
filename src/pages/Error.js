import React from 'react'
import Hero from '../components/Hero';
import {Link} from 'react-router-dom';
import Banner from "../components/Banner";

const Error = () => {
    return (
        <Hero >
            <Banner title="Error 404" subtitle="Page not Found">
                <Link to='/' className="btn-primary">Return Home </Link>
            </Banner>
        </Hero>
    )
}

export default Error
