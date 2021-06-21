
import React, { Component } from 'react';
import H from '../css/Home.module.css';
import R from '../css/Register.module.css';
import queryString from "query-string";

class Login extends Component {
    state = {
        inputId: '',
        inputPs: '',
        loginCheck: []
    }
    componentDidMount(){
    this.getQueryString();
    }

    getQueryString = () => {
        const result = queryString.parse(this.props.location.search);
        const rst = result.ReturnUrl;
        
       return rst;

    }
    loginCancel = () => {
        var page = this.getQueryString();
        document.location.href = page;
    }
    loginApprove = async () => {
        const options = {
            method: "post",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const { inputId, inputPs } = this.state;
        if (inputId === '') {
            alert("ID를 입력해주세요");
        }
        else if (inputPs === '') {
            alert("패스워드를 입력해주세요");
        }
        else if (inputId !== '' && inputPs !== '') {
            await fetch('/login', options)
                .then(response => response.json())
                .then(response => this.setState({ loginCheck: response }))
        }
        const { loginCheck } = this.state;
        if (loginCheck.success === 'true') {
            alert("로그인이 되었습니다.");
            var page = this.getQueryString();
            document.location.href=page;
        }
        else if (loginCheck.success === 'false') {
            alert("로그인 정보가 일치하지 않습니다");

        }
    }


    enterCheck = (event) => {
        if (event.keyCode === 13) {
            this.loginApprove();
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
                    <h1>로그인</h1>
                    <ul>
                        <li><div className={R.label_text}>아이디</div>
                            <input className={R.text_field} type="text" onChange={e => this.setState({ inputId: e.target.value })} />
                        </li>
                        <li><div className={R.label_text}>패스워드</div>
                            <input className={R.text_field} type="password"  onKeyUp={this.enterCheck} onChange={e => this.setState({ inputPs: e.target.value })} />

                        </li>
                        <li><div className={R.btn_box}>
                            <input type="button" value="로그인" onClick={this.loginApprove} className={R.btn_submit} /> <a className={R.btn_cancel} onClick={this.loginCancel}>취소</a>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default Login;