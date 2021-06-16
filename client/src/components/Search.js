import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import S from '../css/Search.module.css';
import queryString from "query-string";
import { Top } from './Home';
class Search extends Component {
    state = {
        keyword: '',
        result: [

        ],
    }
    componentDidMount() {
        this.searchResult();


    }
    searchResult = () => {
        var query = this.getQueryString();
        fetch(`/search?name=${query}`)
            .then(response => response.json())
            .then(response => this.setState({ result: response }))
            .catch(err => console.log(err));

    }
    // btnSearch = () => {
    //     var { keyword } = this.state;
    //     fetch(`/search?name=${keyword}`)
    //         .then(response => response.json())
    //         .then(response => this.setState({ result: response }))
    //         .catch(err => console.log(err));

    // }
    getQueryString = () => {
        const result = queryString.parse(this.props.location.search);
        const rst = result.name;

        return rst;
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }
    enterCheck = (event) => {
        if (event.keyCode === 13) {
            window.location.href = "/item/search?name=" + this.state.keyword;

        }

    }



    render() {
        const { result } = this.state;
        return (
            <div>
                <Top/>
                <div className={S.result_wrap}>
                    <div className={S.item_count}>검색결과 {result.length}건 </div>
                    {result.map((item, index) => {
                        return <div className={S.item_list} key={index}>
                            <img className={S.item_img} src={item.imgsource} alt={item.pct_name} />
                            <div className={S.info_wrap}>
                                <span className={S.prd_name}>{item.pct_name}<br /></span>
                                <span className={S.prd_price}>{this.comma(item.pct_price)}</span>

                            </div>
                        </div>
                    })}
                </div>
            </div >/* end div*/
        )
    }
}



export default Search;