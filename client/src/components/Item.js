import React, { Component } from 'react';
import I from '../css/Item.module.css';
import { Top } from './Home';

import queryString from "query-string";
class Item extends Component {
    state = {
        result: [],
        authority:[],
        count: 1
    }

    componentDidMount() {
        this.searchResult();
        this.checkAuthority();
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

    increase = () => {
        this.setState({ count: this.state.count + 1 })
    }

    decrease = () => {
        if (this.state.count > 1) {
            this.setState({ count: this.state.count - 1 })
        }
    }

    checkAuthority = () => {
        fetch('/authority')
            .then(response => response.json())
            .then(response => this.setState({ authority: response }))
    }

    cartDeliver = () => {
        const options = {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (this.state.authority.length!==0){
            fetch("/cart",options)
            .then(response=>response)
            .then(()=>alert("장바구니에 담겼습니다."))
        }
        else{
            alert("로그인 후 이용부탁드립니다.")
        }
    }

    render() {
        const { result, count } = this.state;
        return (
            <div>
                <Top ReturnUrl={document.location.href} />
                <div className={I.page_wrap}>
                    {result.map((item, index) => {
                        return (
                            <div>
                                <div className={I.product_wrap} key={index}>
                                    <img className={I.product_image} src={item.imgsource} alt={item.pct_name} />
                                    <div className={I.product_title}>{item.pct_name}</div>
                                    <div className={I.product_rank}>실검순위 <span className={I.change}>#99</span></div>
                                    <div className={I.product_price}>{this.comma(item.pct_price)}</div>
                                    <div className={I.product_tip}>실검순위, 평점, 조회수는 실시간 데이터 기반으로 측정됩니다.</div>
                                    <div className={I.product_tooltip}>
                                        <div className={I.product_rate}><div className={I.star_image} /> 평점 <br /> 5점/10점 </div>
                                        <div className={I.product_search}><div className={I.tag_image} />{item.click}회 <br /> 조회됨</div>
                                        <div className={I.product_delivery}><div className={I.deliver_image} /> 무료배송</div>
                                    </div>
                                </div>
                                <div className={I.cart_wrap}>
                                    <div className={I.select_btn}>
                                        <button className={I.btn_increase} onClick={this.increase} />
                                        <div className={I.count}>{count}</div>
                                        <button className={I.btn_decrease} onClick={this.decrease} />
                                    </div>
                                    <div className={I.how_much}>
                                        총 {count}개
                                    </div>
                                    <div className={I.price_sum}>
                                        {this.comma(parseInt(item.pct_price * count))}
                                    </div>
                                    <button className={I.cart_btn} onClick={this.cartDeliver}>
                                        장바구니 담기
                                    </button>
                                </div>
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