import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import H from '../css/Home.module.css';
class Home extends Component {
    state = {
        keyword: '',
        products: [],
        authority: '',
    }
    componentDidMount() {
        this.checkAuthority();
        this.getProducts();
    }

    checkAuthority = () => {
        fetch('/authority')
            .then(response => response.json())
            .then(response => this.setState({ authority: response }))

    }


    getProducts = () => {
        fetch('/api')
            .then(response => response.json())
            .then(response => this.setState({ products: response }))
            .catch(err => console.log(err))
    }

    logoutApi = () => {
        fetch('/logout', {
            method: 'delete'
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
    effect1 = () => {
        var leftB = document.getElementById("leftB");
        var rightB = document.getElementById("rightB");
        var slice = parseInt(document.getElementById("slice").value);
        var startNum = [0, -930, -1850];
        var endNum = [-930, -1850, 0];
        leftB.disabled = 'disabled';
        rightB.disabled = 'disabled';
        var chapter = document.getElementsByClassName("chapter");

        let posx = startNum[slice];
        if (slice !== 2) {
            var move = setInterval(() => {
                posx -= 5;

                document.getElementById("counseller").style.left = posx + "px";
                if (posx === endNum[slice]) {
                    clearInterval(move);
                    leftB.disabled = false;
                    rightB.disabled = false;
                }
            }, 1)
        }
        else {
            move = setInterval(() => {
                posx += 10;
                document.getElementById("counseller").style.left = posx + "px";
                if (posx === endNum[slice]) {
                    clearInterval(move);
                    leftB.disabled = false;
                    rightB.disabled = false;
                }
            }, 1)
        }
        if (slice === 2) {
            document.getElementById("slice").value = 0;
        }
        else {
            document.getElementById("slice").value = slice + 1;
        }
        for (var i = 0; i < 3; i++) {
                let slice = parseInt(document.getElementById("slice").value);   
            if (i === slice  ) {
                chapter[slice].style.backgroundColor = "rgb(39, 131, 230)";
            }
            else{
                chapter[i].style.backgroundColor = "snow";
            }

        }

    } // 상품오른쪽으로 넘기기

    effect2 = () => {
        var leftB = document.getElementById("leftB");
        var rightB = document.getElementById("rightB");
        leftB.disabled = 'disabled';
        rightB.disabled = 'disabled';
        var slice = parseInt(document.getElementById("slice").value);
        var startNum = [0, -930, -1850];
        var endNum = [-1850, 0, -930];
        let posx = startNum[slice];
        var chapter = document.getElementsByClassName("chapter");

        if (slice !== 0) {
            var move = setInterval(() => {
                posx += 5;
                document.getElementById("counseller").style.left = posx + "px";
                if (posx === endNum[slice]) {
                    clearInterval(move);
                    leftB.disabled = false;
                    rightB.disabled = false;
                }
            }, 1)
        }
        else {
            move = setInterval(() => {
                posx -= 10;
                document.getElementById("counseller").style.left = posx + "px";
                if (posx === endNum[slice]) {
                    clearInterval(move);
                    leftB.disabled = false;
                    rightB.disabled = false;
                }
            }, 1)
        }
        if (slice === 0) {
            document.getElementById("slice").value = 2;
        }
        else {
            document.getElementById("slice").value = slice - 1;
        }
        for (var i = 0; i < 3; i++) {
            let slice = parseInt(document.getElementById("slice").value);   
            if (i === slice) {
                chapter[slice].style.backgroundColor = "rgb(39, 131, 230)";
            }
            else{
                chapter[i].style.backgroundColor = "snow";
            }
        }

    }   //상품 왼쪽으로 넘기기

    render() {
        const { products } = this.state;
        const { authority } = this.state;
        return (
            <div className={H.homewrap}>
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
                        {authority.status === "login" ? <div className={H.profile_display}> {authority.nickname}님 환영합니다.   </div> : ''}
                        <div className={H.util_etc}>
                            <ul>
                                <li>{authority.status === "login" ? <a onClick={this.logoutApi}>로그아웃</a> : <Link to="/login">로그인</Link>}</li>
                                <li><Link to="/register">회원가입</Link></li>
                                <li>고객센터</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={H.arrows}>
                    <button className={H.left_arrow} id="leftB" onClick={this.effect2} />
                    <button className={H.right_arrow} id="rightB" onClick={this.effect1} />
                    <div className={H.main}>
                        <h1>상품목록</h1>
                        <div className={H.item_list}>

                            <div className={H.counseller} id="counseller">
                                <ul>
                                    {products.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <input type="hidden" value="0" id="slice" />
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
                        <div className={H.slice_chapter}>
                            <ul>
                                <li>
                                    <div className="chapter" />
                                    <div className="chapter" />
                                    <div className="chapter" />
                                </li>


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