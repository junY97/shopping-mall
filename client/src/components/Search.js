import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import H from '../css/Home.module.css';
import S from '../css/Search.module.css';
import queryString from "query-string";
class Search extends Component {
    state = {
        keyword: '',
        result: [
         
        ],
    }
    componentDidMount() {
        this.searchResult();
      

    }  
    searchResult = () => {
        var query = this.getQueryString();
        fetch(`/search?name=${query}`)
            .then(response => response.json())
            .then(response => this.setState({ result: response }))
            .catch(err => console.log(err));

    }
    btnSearch = () => {
        var { keyword } = this.state;
        fetch(`/search?name=${keyword}`)
            .then(response => response.json())
            .then(response => this.setState({ result: response }))
            .catch(err => console.log(err));

    }
        getQueryString = () => {
        const result = queryString.parse(this.props.location.search);
        const rst=result.name;
     
        return rst;
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }
    enterCheck = (event) =>{
        if(event.keyCode===13){
            window.location.href="/item/search?name="+this.state.keyword;
       
        }
       
    }
    


    render() {
        const { result } = this.state;
        return ( 
            <div>
                <div className={H.header}>
                    <div className={H.inner}>
                        <div className={H.logo}>
                            <div className={H.logo_text}>수산마켓</div>
                        </div>
                        <div className={H.search}>
                            <input type="text" className={H.search_text}  onKeyUp={this.enterCheck} onChange={e => this.setState({ keyword: e.target.value })} />
                            <Link className={H.search_btn} to={"/item/search?name=" + this.state.keyword} onClick={this.btnSearch} />
                        </div>
                        <div className={H.user_menu}>
                            <ul>
                                <li className={H.my_cart} />
                                <li className={H.my_profile} />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={S.result_wrap}>
                    <div className={S.item_count}>검색결과 {result.length}건 </div>
                    {result.map((item,index) => {
                        return <div className={S.item_list} key={index}>
                            <img className={S.item_img} src={item.imgsource} alt={item.pct_name}/>
                            <div className={S.info_wrap}>
                                <span className={S.prd_name}>{item.pct_name}<br/></span>
                                <span className={S.prd_price}>{this.comma(item.pct_price)}</span>

                            </div>
                        </div>
                    })}
                </div>
            </div >/* end div*/
        )
    }
}



export default Search;