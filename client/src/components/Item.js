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
    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }
    colorChange = () => {
        var color = ["orange","pink","yellow","blue","black","skyblue","red"];
        setInterval(() => {
            for(var i=0;i<color.length();i++){
                document.getElementById("change").color= color[i];
            }
        }, 1000);
    }

    render() {
        const { result } = this.state;
        return (
            <div>
                <Top />
                <div className={I.page_wrap}>
                    {result.map((item, index) => {
                        return (
                            <div className={I.product_wrap} key={index}>
                            <img className={I.product_image} src={item.imgsource} alt={item.pct_name} />
                            <div className={I.product_title}>{item.pct_name}</div>
                            <div className={I.product_rank}>실검순위 <span id="change" className={I.change}>#99</span></div>
                            {(function(){
                                setInterval(() => {
                                         var random = Math.floor(Math.random()*7);
                                        var mix = ["orange","purple","green","skyblue","red"];
                                          document.getElementById("change").style.color = mix[random];

                                 },600);
                            })()}
                            <div className={I.product_price}>{this.comma(item.pct_price)}</div>
                            </div>

                        )
                    })
                    }
                   
                </div>
            </div>
        )
    }
}
export default Item;