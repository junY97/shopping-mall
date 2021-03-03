import React, { Component } from 'react';
import H from '../css/Home.module.css';



class Login extends Component {
    state = {
        inputId:'',
        inputPs:''
    }
    loginApi = () => {
        const options = {
           method:"post",
           body:JSON.stringify(this.state),
           headers:{
            'Content-Type': 'application/json'
           }
        }
    
    return  fetch('/login',options);

    }
    
    render() {
      return(
      <div>
            <div className={H.header}>
                <div className={H.inner}>
                    <div className={H.logo}>
                        <div className={H.logo_text}>수산마켓</div>
                    </div>
                    
                </div>
            </div>
         아이디: <input type="text" onChange={e=>this.setState({inputId:e.target.value})}/>
         패스워드 : <input type="password" onChange={e=>this.setState({inputPs:e.target.value})} />
         <input type="button" value="로그인" onClick={this.loginApi}/>
        </div>
      )
    }
}

export default Login;