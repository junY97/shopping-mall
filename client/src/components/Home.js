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
                        <Link to="/">
                        <div className={H.logo}>
                            <div className={H.logo_text}>수산마켓</div>
                        </div>
                        </Link>
                        <div className={H.search}>
                            <input type="text" className={H.search_text} id="keyword" onKeyUp={this.enterCheck} onChange={e => this.setState({ keyword: e.target.value })} />
                            <Link className={H.search_btn} id="link" to={"/item/search?name=" + this.state.keyword} />
                        </div>
                        <div className={H.user_menu}>
                            <ul>
                              <li className={H.my_cart}><span>장바구니</span></li>
                              <Link to="/Account"> <li className={H.my_profile}><span>회원변경</span></li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={H.util_service}>
                    <div className={H.inner}>
                        {authority.status==="login"?<div className={H.profile_display}> {authority.nickname}님 환영합니다.   </div>:''}
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
                    <div className={H.left_arrow} />
                    <div className={H.right_arrow} />
                    <div>
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
                </div>
                <div className={H.bottom} />
            </div>
        )
    }
}

export default Home;