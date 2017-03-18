import React from 'react'
import Add from './components/add.js'
import Currency from './components/currency.js'
import axios from 'axios'
import { connect } from 'react-redux'
import { toggleActive } from './actions/actions.js'

class App extends React.Component{

    componentDidMount () {
        // axios.get(`http://api.fixer.io/latest?symbols=USD,NTD`)
        //     .then(res => {
        //         console.log(res);
        //     });
    }

    handleActive (idx, e) {
        this.props.dispatch( toggleActive(idx) );
    }

    render () {

        let { items } = this.props;
        let totalCost = 0;
        let showItems = items.map((val, idx) => {
                if( val.active ){
                    totalCost = totalCost + (val.pricePerUnit*val.amount);    
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
        return(
        	<div>
                <Currency />
            	<Add />

                <div className="totalCost">
                    Total cost: { totalCost }
                </div>

            	<ul>
            	   { showItems }
            	</ul>
        	</div>
        );
    }
}

function getItems (state) {
	return {
        items: state.items
    };
}

export default connect(getItems)(App);