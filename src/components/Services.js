import React, { Component } from 'react';
import Title from './Title';

import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
export default class Services extends Component {

    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "Free Coctail",
                info: 'Ad occaecat commodo qui in labore ea ea labore in. Eiusmod ea sit incididunt exercitation nulla sunt esse.'
            },

            {
                icon: <FaHiking />,
                title: "Free Hiking",
                info: 'Deserunt eu irure anim proident Lorem id dolore non enim aute eiusmod do anim. Sint cillum laborum et enim dolore labore consequat occaecat cupidatat commodo sit.'
            },

            {
                icon: <FaShuttleVan />,
                title: "Shuttle Van",
                info: 'Ut incididunt id quis amet adipisicing mollit eiusmod non non amet. Reprehenderit do mollit fugiat ipsum qui proident commodo labore.'
            },

            {
                icon: <FaBeer />,
                title: "Free Local Beer",
                info: 'Aliqua irure do tempor nisi do aliqua amet velit exercitation aute nisi. Sint nisi amet sit labore ipsum ex eiusmod est dolore.'
            }
        ]
    }
    render() {
        return (
            <section className='services'>
                <Title title='services'></Title>

                <div className="services-center">

                    {this.state.services.map((item, index) => {
                        return (
                            <article key={index} className="services">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        )
    }
}
