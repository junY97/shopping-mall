import React, { Component } from 'react';
import I from '../css/Item.module.css';
import { Top } from './Home';
import queryString from "query-string";
class Item extends Component {
    state = {
        result: []
    }
    componentDidMount() {
        this.searchResult();
    }
    searchResult = () => {
        var query = this.getQueryString();

        fetch(`/itemApi?item=${query}`)
            .then(response => response.json())
            .then(response => this.setState({ result: response }))
            .catch(err => console.log(err));

    }
    getQueryString = () => {
        const result = queryString.parse(this.props.location.search);
        const rst = result.item;

        return rst;
    }
    render() {
        const { result } = this.state;
        return (
            <div>
                <Top />
                <div className={I.page_wrap}>
                    {result.map((item, index) => {
                        return (

                            <img className={I.product_image} src={item.imgsource} alt={item.pct_name} />
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}
export default Item;