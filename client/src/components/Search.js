import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeStyle from '../css/Home.module.css';
import SearchStyle from '../css/Search.module.css';
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
        var query = this.getQueryString("name");
        fetch(`/search/api?name=${query}`)
            .then(response => response.json())
            .then(response => this.setState({ result: response }))
            .catch(err => console.log(err));

    }
    btnSearch = () => {
        var { keyword } = this.state;
        fetch(`/search/api?name=${keyword}`)
            .then(response => response.json())
            .then(response => this.setState({ result: response }))
            .catch(err => console.log(err));

    }
    getQueryString = (key) => {
        var str = decodeURI(document.location.href);
        var index = str.indexOf("?") + 1;
        var lastIndex = str.indexOf("#") > -1 ? str.indexOf("#") + 1 : str.length;
        if (index == 0) {
            return "";
        }
        str = str.substring(index, lastIndex);
        str = str.split("&");
        var rst = "";
        for (var i = 0; i < str.length; i++) {
            var arr = str[i].split("=");
            if (arr.length != 2) {
                break;
            }
            if (arr[0] == key) {
                rst = arr[1];
                break;
            }
        }
        return rst;
    }

    comma = (price) => {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        price = price + ""

        return price.toString().replace(regexp, ',') + "원";
    }
    enterCheck = (event) =>{
        if(event.keyCode===13){
        document.location.href="/search?name="+this.state.keyword;
        }
    }


    render() {
        const { result } = this.state;
        return ( 
            <div>
                <div className={HomeStyle.header}>
                    <div className={HomeStyle.inner}>
                        <div className={HomeStyle.logo}>
                            <div className={HomeStyle.logo_text}>수산마켓</div>
                        </div>
                        <div className={HomeStyle.search}>
                            <input type="text" className={HomeStyle.search_text} onKeyUp={this.enterCheck} onChange={e => this.setState({ keyword: e.target.value })} />
                            <Link className={HomeStyle.search_btn} to={"/search?name=" + this.state.keyword} onClick={this.btnSearch} />
                        </div>
                        <div className={HomeStyle.user_menu}>
                            <ul>
                                <li className={HomeStyle.my_cart} />
                                <li className={HomeStyle.my_profile} />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={SearchStyle.result_wrap}>
                    <div className={SearchStyle.item_count}>검색결과 {result.length}건 </div>
                    {result.map((item,index) => {
                        return <div className={SearchStyle.item_list} key={index}>
                            <img className={SearchStyle.item_img} src={item.imgsource} />
                            <div className={SearchStyle.info_wrap}>
                                <span className={SearchStyle.prd_name}>{item.pct_name}<br/></span>
                                <span className={SearchStyle.prd_price}>{this.comma(item.pct_price)}</span>

                            </div>
                        </div>
                    })}
                </div>
            </div >/* end div*/
        )
    }
}



export default Search;