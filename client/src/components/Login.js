import React, { Component } from 'react';
import HomeStyle from '../css/Home.module.css';

class Login extends Component {
    render() {
      return(
      <div>
            <div className={HomeStyle.header}>
                <div className={HomeStyle.inner}>
                    <div className={HomeStyle.logo}>
                        <div className={HomeStyle.logo_text}>수산마켓</div>
                    </div>
                    
                </div>
            </div>
            <h1>회원가입</h1>

        </div>
      )
    }
}

export default Login;