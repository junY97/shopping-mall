
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from '../css/Home.module.css';
class Home extends Component {
    state = {
        keyword: '',
        products:[],
    }
    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        fetch('/api')
            .then(response => response.json())
            .then(response => this.setState({ products: response }))
            .catch(err => console.log(err))
}
    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }
    enterCheck = (event) =>{
        if(event.keyCode===13){
        document.location.href="/#/search?name="+this.state.keyword;
        }
    }

    render() {
        const { products } = this.state;
        return (

            <div>
                    <div className={style.header}>
                        <div className={style.inner}>
                            <div className={style.logo} to="/">
                                <div className={style.logo_text}>수산마켓</div>
                        </div>
                            <div className={style.search}>
                                <input type="text" className={style.search_text} id="keyword" onKeyUp={this.enterCheck} onChange={e => this.setState({ keyword: e.target.value })} />
                                <Link className={style.search_btn} id="link" to={"/search?name=" + this.state.keyword}/>
                        </div>
                            <div className={style.user_menu}>
                            <ul>
                                    <li className={style.my_cart} />
                                    <li className={style.my_profile} />
                            </ul>
                        </div>
                    </div>
                </div>
                    <div className={style.util_service}>
                        <div className={style.inner}>
                            <div className={style.util_etc}>
                            <ul>
                                <li><Link to="/login">로그인</Link></li>
                                <li><Link to="/register">회원가입</Link></li>
                                <li>고객센터</li>
                            </ul>
                        </div>
                    </div>
                </div>
                    <div className={style.main}>
                        <div className={style.item_list}>
                        <ul>
                            {products.map((item,index) => {
                                return (
                                    <li key={index}>
                                            <div className={style.item_wrap}>
                                                <img className={style.item_img} src={item.imgsource} alt={item.pct_name} />
                                                <div className={style.item_text}> {item.pct_name}</div>
                                                <div className={style.item_price} >{this.comma(item.pct_price)}</div>
                                        </div>
                                    </li>
                                )
                            })
                            }
                        </ul>

                    </div>
                </div>
                    <div className={style.bottom}/>
            </div>
        )
    }
}

export default Home;
