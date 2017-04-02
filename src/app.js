import React from 'react'
import Add from './components/add.js'
import Currency from './components/currency.js'
import ShowItems from './components/showItems.js'
import axios from 'axios'
import { connect } from 'react-redux'
import { toggleActive } from './actions/actions.js'

class App extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            base: 'USD',
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
        let addr = "https://api.fixer.io/latest";
        let base = "?base=" + this.state.base;

        axios.get(addr+base)
            .then(res => {
                const rates = res.data.rates;
                this.setState({rate: rates});
            });

        // Can't use https without paying
        // let addr = "https://apilayer.net/api/live";
        // let accessKey = "9cb6793dd9c50dc5befc67e6605be61f";
        // let url = addr+"?access_key="+accessKey;
        // axios.get(url)
        //     .then(res => {
        //         const rates = res.data.quotes;
        //         console.log(res);
        //         this.setState({rate: rates});
        //     });
    }

    

    toggleChangeBase () {
        if(  this.state.changingBase 
         && (this.state.curCheckedBase != this.state.base)
         && (this.state.curCheckedBase != ""))
        {
            this.setState({base: this.state.curCheckedBase});
            
            let addr = "https://api.fixer.io/latest";
            let base = "?base=" + this.state.curCheckedBase;

            axios.get(addr+base)
                 .then(res => {
                    const rates = res.data.rates;
                    this.setState({rate: rates});
                });
        }
        this.setState({changingBase: !this.state.changingBase});
    }

    handleChangeBase (val) {
        this.setState({curCheckedBase: val});
    }

    currencySwitch (cur, howmuch) {
        return howmuch / this.state.rate[cur];

        // Can't use https without paying
        // // 1. change from cur to USD
        // let query1 = "USD"+cur;
        // let USDprice = howmuch / this.state.rate[query1];
        // // 2. change from USD to base
        // let query2 = "USD"+this.state.base;
        // return (USDprice*this.state.rate[query2]);
    }

    render () {
        let { items, currencies } = this.props;
        

        let totalCost = 0;
        items.map((val, idx) => {
                if( val.active ){
                    if( val.currency != this.state.base ){
                        totalCost = totalCost + this.currencySwitch(val.currency, val.pricePerUnit*val.amount);
                    }else{
                        totalCost = totalCost + val.pricePerUnit*val.amount;
                    }
                }
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
            	<ShowItems />
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