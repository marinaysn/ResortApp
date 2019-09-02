import React, { Component } from 'react';
// import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,

        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false

    };

    //getData
    getData = async () => {
        try {

            let response = await Client.getEntries({
                content_type: "beachResortApp",
                order: '-fields.price,fields.capacity',
                
            });

            console.log(response.items);

            let rooms = this.formatData(response.items);
          
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPr = Math.max(...rooms.map(i => i.price));
            let maxS = Math.max(...rooms.map(i => i.size));
    
            let minPr = Math.min(...rooms.map(i => i.price));
    
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPr,
                maxPrice: maxPr,
                maxSize: maxS,
                minPrice: minPr
            });

        } catch (error) {
            console.log(error);
        }
    }


    componentDidMount() {

        this.getData();

        // used in getData function

        // let rooms = this.formatData(items);
        // rooms = rooms.reverse(); // need to rander all rooms in desc. order
        // let featuredRooms = rooms.filter(room => room.featured === true);
        // let maxPr = Math.max(...rooms.map(i => i.price));
        // let maxS = Math.max(...rooms.map(i => i.size));

        // let minPr = Math.min(...rooms.map(i => i.price));

        // this.setState({
        //     rooms,
        //     featuredRooms,
        //     sortedRooms: rooms,
        //     loading: false,
        //     price: maxPr,
        //     maxPrice: maxPr,
        //     maxSize: maxS,
        //     minPrice: minPr
        // });
    }


    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((r) => r.slug === slug);
        return room;
    }

    handleChange = event => {

        const type = event.target.type;

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;


        //run as callback function filterRooms
        this.setState({
            [name]: value
        }, this.filterRooms)

    }

    filterRooms = () => {

        let {
            rooms, type, capacity, price, minSize, maxSize, maxPrice,
            breakfast, pets, minPrice
        } = this.state;

        //all the rooms
        let tempRooms = [...rooms];
        //transform values for type
        capacity = parseInt(capacity);
        price = parseInt(price);

        //filter by type
        if (type !== 'all') {
            tempRooms = tempRooms.filter(r => r.type === type)
        }

        //filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(r => r.capacity >= capacity)
        }

        //filter by price

        tempRooms = tempRooms.filter(r => r.price <= price)

        //filter by size

        tempRooms = tempRooms.filter(r => (r.size >= minSize && r.size <= maxSize))

        //pets and breakfast
        if (pets) {
            tempRooms = tempRooms.filter(r => r.pets === true)
        }

        if (breakfast) {
            tempRooms = tempRooms.filter(r => r.breakfast === true)
        }


        this.setState({
            sortedRooms: tempRooms,
            minPrice: Math.min(...tempRooms.map(i => i.price)),

        })


        console.log(tempRooms)
    }


    formatData(items) {
        let tempItems = items.map(item => {

            let id = item.sys.id;
            let images = item.fields.images.map(i =>
                i.fields.file.url
            );
            //let room = {...item.fields,images:images,id}
            //alternatie way:
            // since images are part of field in the data we just overwritting with out new array off images. According to new ES6 instead of images: images, we will just write images, id, on the other hand is not part of field in the data and must be added:
            let room = { ...item.fields, images, id }

            return room;
        })
        return tempItems;
    }

    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
};

export { RoomProvider, RoomConsumer, RoomContext };