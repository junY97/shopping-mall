import React, { Component } from 'react';
import I from '../css/Item.module.css';
import {Top} from './Home';
class Item extends Component {
    state = {

    }
    componentDidMount() {

    }
    render() {
        return (
            
            <div>
                <Top/>
            <div className={I.pagewrap}/>

            <div className={I.productimage}/>
            </div>
        )
    }
}
export default Item;