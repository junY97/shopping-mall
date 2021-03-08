import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import H from '../css/Home.module.css';
class Home extends Component {
    state = {
        keyword: '',
        products: [],
        authority:'',
    }
    componentDidMount() {
        this.getProducts();
        this.checkAuthority();
      
    }

    checkAuthority = () => {
        fetch('/authority')
            .then(response=>response.json())
            .then(response=>this.setState({authority:response}))
          
    }


    getProducts = () => {
        fetch('/api')
            .then(response => response.json())
            .then(response => this.setState({ products: response }))
            .catch(err => console.log(err))
    }

    logoutApi = () =>{
        fetch('/logout',{
            method:'delete'
        });
        window.location.replace("/");

    }


    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }
    enterCheck = (event) => {
        if (event.keyCode === 13) {
            this.props.history.push("/item/search?name=" + this.state.keyword);
        }
    }

    render() {
        const { products } = this.state;
        const { authority } = this.state;
        return (
            <div>
                <div className={H.header}>
                    <div className={H.inner}>
                        <div className={H.logo} to="/">
                            <div className={H.logo_text}>수산마켓</div>
                        </div>
                        <div className={H.search}>
                            <input type="text" className={H.search_text} id="keyword" onKeyUp={this.enterCheck} onChange={e => this.setState({ keyword: e.target.value })} />
                            <Link className={H.search_btn} id="link" to={"/item/search?name=" + this.state.keyword} />
                        </div>
                        <div className={H.user_menu}>
                            <ul>
                                <li className={H.my_cart} />
                                <li className={H.my_profile} />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={H.util_service}>
                    <div className={H.inner}>
                        <div className={H.util_etc}>
                            <ul>
                                <li>{authority.status==="login"?<a onClick={this.logoutApi}>로그아웃</a>:<Link to="/login">로그인</Link>}</li>
                                <li><Link to="/register">회원가입</Link></li>
                                <li>고객센터</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={H.main}>
                    <div className={H.item_list}>
                        <ul>
                            {products.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div className={H.item_wrap}>
                                            <img className={H.item_img} src={item.imgsource} alt={item.pct_name} />
                                            <div className={H.item_text}> {item.pct_name}</div>
                                            <div className={H.item_price} >{this.comma(item.pct_price)}</div>
                                        </div>
                                    </li>
                                )
                            })
                            }
                        </ul>

                    </div>
                </div>
                <div className={H.bottom} />
            </div>
        )
    }
}

export default Home;
