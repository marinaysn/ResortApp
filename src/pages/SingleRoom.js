import React, { Component } from 'react'
import defaultBCG from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import StyledHero from "../components/StylesHero";

export default class SingleRoom extends Component {
    constructor(props) {
        super(props)
        //  console.log("bobbbbyyy" + this.props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBCG
        }
    }

    static contextType = RoomContext;

    // componentDidMount() {
    // }

    render() {

        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        //console.log(room);

        if (!room) {
            return (
                <div className="error">
                    <h3>no such room could be found...</h3>
                    <Link to="/rooms" className="btn-primary">back to rooms</Link>
                </div>
            );
        }

        const { name,
            description,
            capacity,
            size,
            price,
            extras,
            breakfast,
            pets,
            images } = room;

        const [mainImage, ...defaultImg] = images;

        return (
            <>
                <StyledHero img={mainImage || this.state.defaultBCG}>
                    <Banner title={`${name} room`}>
                        <Link to='/rooms' className="btn-primary">back to rooms</Link>
                    </Banner>
                </StyledHero>

                <section className="single-room">
                    <div className="single-room-images">
                        {images.map((item, index) => {
                            return <img key={index} src={item} alt={name} />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Details:</h3>
                            <p>{description}</p>
                        </article>

                        <article className="info">
                            <h3>Info:</h3>
                            <h6>Price: ${price}</h6>
                            <h6>Size: {size} Sqft</h6>
                            <h6>Max Capacity: {capacity > 1 ? ` ${capacity} people` : ` ${capacity} person`}</h6>
                            <h6>{pets ? "Pets allowed" : "No pets allowed"}</h6>
                            <h6>{breakfast && "Breakfast included"}</h6>
                        </article>

                    </div>
                </section>
                <section className="room-extras">

                <article >
                            <h3>Extras:</h3>
                            <ul className="extras">
                                {extras.map((i, idx )=>{
                                   return <li key={idx}> - {i}</li>
                                })}
                            </ul>
                        </article>
                </section>
            </>
        )
    }
}
