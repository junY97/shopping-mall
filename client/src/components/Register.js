import React, { Component } from 'react';
import H from '../css/Home.module.css';
import R from '../css/Register.module.css';
import { Link } from 'react-router-dom';
class Register extends Component {
    state = {
        id: '',
        password: '',
        nickname: '',
        address: '',
        idcheck: ''
    }
    idCheck = async () => {
        const { id } = this.state;
        await fetch(`/idcheck?id=${id}`)
            .then(response => response.json())
            .then(response => this.setState({ idcheck: response }))
        const { idcheck } = this.state;
        if (id === '') {
            alert('ID를 입력하세요.');
            
        }
        else if (idcheck.length === 0) {
            alert('해당 ID는 사용가능합니다.');
        }
        else if(idcheck.length===1){
            alert('해당 ID는 이미 존재합니다.');
            

        }
      
       
    }

    sendData = async () => {
        const options = {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }
      await this.idCheck; 
        const {id, password, nickname, idcheck } = this.state;
        if (id !== '' & password !== '' & nickname !== '' & idcheck.length === 0) {
            return fetch("/register", options)
                .then(() => alert('가입되었습니다.'))
                .then(() => document.location.href = '/')
        }
        else {
            if(id===''){
                alert('ID 입력 바랍니다.');
            }
            else if (idcheck.length !==0) {
                alert('ID 중복확인 바랍니다.');
            }
            else if (password === '') {
                alert('패스워드 입력 부탁드립니다.');
            }
            else if (nickname === '') {
                alert('닉네임 입력 부탁드립니다.');
            }
        }
    }
    lowerCase = () =>{
        var id=document.getElementById("id_field");
        id.value=id.value.toLowerCase();
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
                    <h1>회원가입</h1>
                    <ul>
                        <li><div className={R.label_text}><span className={R.highlight}>* </span>아이디</div>
                            <input className={R.text_field} type="text" id="id_field" onKeyUp={this.lowerCase} onChange={e => this.setState({ id: e.target.value })} />
                            <input type="button" value="중복확인" onClick={this.idCheck} className={R.check_field} /></li>

                        <li><div className={R.label_text}><span className={R.highlight}>* </span>패스워드</div>
                            <input className={R.text_field} type="password" onChange={e => this.setState({ password: e.target.value })} /></li>

                        <li><div className={R.label_text}><span className={R.highlight}>* </span>닉네임</div>
                            <input className={R.text_field} type="text" onChange={e => this.setState({ nickname: e.target.value })} /></li>

                        <li><div className={R.label_text}>주소</div>
                            <input className={R.text_field} type="text" onChange={e => this.setState({ address: e.target.value })} /></li>
                        <li>    
                            <div className={R.btn_box}>

                                <input type="button" value="가입" onClick={this.sendData} className={R.btn_submit} /> <Link className={R.btn_cancel} to={"/"}>취소</Link>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default Register;