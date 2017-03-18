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
            rate: {"TWDUSD":0.0327},
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
        let addr = "http://apilayer.net/api/live";
        let accessKey = "9cb6793dd9c50dc5befc67e6605be61f";
        let source = this.state.base;
        let url = addr+"?access_key="+accessKey+"&source="+source;

        // axios.get(url)
        //     .then(res => {
        //         const rates = res.data.quotes;
        //         this.setState({rate: rates});
        //     });
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

    currencySwitch (target, howmuch) {
        if( (this.state.base+target) in this.state.rate ){
            let query0 = this.state.base+target;
            return (howmuch / this.state.rate[query0]);
        }else if( (target+this.state.base) in this.state.rate ){
            let query1 = target+this.state.base;
            return (howmuch*this.state.rate[query1]);
        }
    }

    render () {
        let { items, currencies } = this.props;

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
                        {val.name+": "+val.pricePerUnit+"*"+val.amount+" "+val.currency}
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
        	<div>
                <Currency />
            	<Add />

                <div className="totalCost">
                    Total cost: { totalCost + this.state.base}
                    <button onClick={this.toggleChangeBase}>
                        {this.state.changingBase?"Finish":"Change Base"}
                    </button>
                    {this.state.changingBase?showCurOption:""}
                </div>

            	<ul>
            	   { showItems }
            	</ul>
        	</div>
        );
    }
}

function select (state) {
	return state;
}


export default connect(select)(App);