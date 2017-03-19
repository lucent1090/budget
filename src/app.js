import React from 'react'
import Add from './components/add.js'
import Currency from './components/currency.js'
import axios from 'axios'
import { connect } from 'react-redux'
import { toggleActive } from './actions/actions.js'

class App extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            base: 'TWD',
            rate: {},
            changingBase: false,
            curCheckedBase: ''
        };

        this.currencySwitch = this.currencySwitch.bind(this);
        this.toggleChangeBase = this.toggleChangeBase.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        let { items, currencies } = nextProps;
        items.map((val, idx) => {
            if( !currencies.includes(val.currency) && val.active ){
                this.props.dispatch( toggleActive(idx) );
            }
        });
    }

    componentDidMount () {
        let addr = "https://apilayer.net/api/live";
        let accessKey = "9cb6793dd9c50dc5befc67e6605be61f";
        let url = addr+"?access_key="+accessKey;

        axios.get(url)
            .then(res => {
                const rates = res.data.quotes;
                this.setState({rate: rates});
            });
    }

    handleActive (idx, e) {
        this.props.dispatch( toggleActive(idx) );
    }

    toggleChangeBase () {
        if(  this.state.changingBase 
         && (this.state.curCheckedBase != this.state.base)
         && (this.state.curCheckedBase != ""))
        {
            this.setState({base: this.state.curCheckedBase});
        }
        this.setState({changingBase: !this.state.changingBase});
    }

    handleChangeBase (val) {
        this.setState({curCheckedBase: val});
    }

    currencySwitch (cur, howmuch) {
        // 1. change from cur to USD
        let query1 = "USD"+cur;
        let USDprice = howmuch / this.state.rate[query1];
        // 2. change from USD to base
        let query2 = "USD"+this.state.base;
        return (USDprice*this.state.rate[query2]);
    }

    render () {
        let { items, currencies } = this.props;
        items.sort((a, b) => {
            if(a.active && !b.active){
                return -1;
            }
            if(b.active && !a.active){
                return 1;
            }
            return 0;
        });

        let totalCost = 0;
        let showItems = items.map((val, idx) => {
                if( val.active ){
                    if( val.currency != this.state.base ){
                        totalCost = totalCost + this.currencySwitch(val.currency, val.pricePerUnit*val.amount);
                    }else{
                        totalCost = totalCost + val.pricePerUnit*val.amount;
                    }
                }
                return (
                    <li key={idx}>
                        <input type="checkbox" 
                               checked={val.active}
                               onChange={this.handleActive.bind(this, idx)} />
                        <span id="name">{val.name}</span><br/>
                        <div id="detail">
                            <span id="price">{val.pricePerUnit}</span>
                            <span id="currency">{val.currency}</span>
                            <span id="x">X</span>
                            <span id="amount">{val.amount}</span>
                        </div>
                    </li>
                );
        });
        
        let showCurOption = currencies.map((val, idx) => {
                return(
                    <label key={idx}>
                        <input type="radio"
                               checked={this.state.curCheckedBase == val}
                               onChange={this.handleChangeBase.bind(this, val)} />
                        {val}
                    </label>
                );
        });
        return(
        	<div className="app">
                <Currency />
            	<Add />
            	<ul>
            	   { showItems }
            	</ul>
                <div className="totalCost">
                    Total cost
                    <div className="money">
                        { totalCost + " " + this.state.base}
                    </div>
                    <div className="baseOption">
                        {this.state.changingBase?showCurOption:""}
                    </div>
                    <button onClick={this.toggleChangeBase}>
                        {this.state.changingBase?"Finish":"Change Base"}
                    </button>
                </div>
        	</div>
        );
    }
}

function select (state) {
	return state;
}


export default connect(select)(App);