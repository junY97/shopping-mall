import React, { Component } from 'react';
import H from '../css/Home.module.css';
import R from '../css/Register.module.css';
import { Link } from 'react-router-dom';

class UpdateCusotmer extends Component {
    state = {
        password: '',
        passwordCheck: '',
        nickname: '',
        address: '',
        authority: '',
    }
    componentDidMount() {
        this.checkAuthority();
        this.onVisible();
    }
    checkAuthority = () => {
        fetch('/authority')
            .then(response => response.json())
            .then(response => this.setState({ authority: response }))
            .then(()=>this.setState({nickname:this.state.authority.nickname,address:this.state.authority.address}))
          
            
    }
        onVisible = () =>   {
        document.getElementById("root").style.visibility = "visible";
    }
    logoutApi = () => {
        fetch('/logout', {
            method: 'delete'
        });
        document.location.href="/";
    }
 

    sendData = () => {
        const options = {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (this.state.authority.status === 'login') {
            if (this.state.password === '') {
                alert('새 비밀번호를 입력해주세요.')
            }
            else if (this.state.password !== this.state.passwordCheck) {
                alert('새 비밀번호를 둘다 일치하는지 다시 확인해주세요.')
            }
            else {
                fetch('customerUpdate', options)
                .then(() => alert('변경 되었습니다. \n새 정보로 다시 로그인 부탁드립니다.'))
                .then(this.logoutApi)
            }
        }
        else {
            alert('유효시간이 지났습니다. 재 로그인 후 이용바랍니다. ')
            document.location.href = "/";
        }
    }





    render() {
        return (
            <div>
                <div className={H.header}>
                    <div className={H.inner}>
                        <div className={H.logo}>
                            <div className={H.logo_text}>수산마켓</div>
                        </div>
                    </div>
                </div>
                <div className={R.body_wrap}>
                    <h1>회원 변경</h1>
                    <ul>

                        <li><div className={R.label_text}><span className={R.highlight}>* </span>새 비밀번호</div>
                            <input className={R.text_field} type="password" onChange={e => this.setState({ password: e.target.value })} /></li>

                        <li><div className={R.label_text}><span className={R.highlight}>* </span>새 비밀번호 확인</div>
                            <input className={R.text_field} type="password" onChange={e => this.setState({ passwordCheck: e.target.value })} /></li>

                        <li><div className={R.label_text}>닉네임</div>
                            <input className={R.text_field} type="text" onChange={e => this.setState({ nickname: e.target.value })} placeholder={this.state.authority.nickname} /></li>

                        <li><div className={R.label_text}>주소</div>
                            <input className={R.text_field} type="text" onChange={e => this.setState({ address: e.target.value })} placeholder={this.state.authority.address} /></li>
                        <li>
                            <div className={R.btn_box}>

                                <input type="button" value="변경" onClick={this.sendData} className={R.btn_submit} /> <Link className={R.btn_cancel} to={"/"}>취소</Link>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default UpdateCusotmer;
