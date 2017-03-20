import React from 'react'
import { connect } from 'react-redux'
import { toggleActive, editItem, delItem } from './../actions/actions.js'

class ShowItems extends React.Component{

	constructor (props) {
        super(props);
    }

	handleActive (idx, e) {
        this.props.dispatch( toggleActive(idx) );
    }

    handleDetailChange (idx, field, e) {
    	this.props.dispatch( editItem(idx, field, e.target.value) );
    }

    handleDoubleClick (idx, e) {
    	this.props.dispatch( delItem(idx) );
    }

	render () {
		let { items } = this.props;		
		items.sort((a, b) => {
            if(a.active && !b.active){
                return -1;
            }
            if(b.active && !a.active){
                return 1;
            }
            return 0;
        }); 
        let showItems = items.map((val, idx) => {
                return (
                    <li key={idx}
                    	onDoubleClick={this.handleDoubleClick.bind(this, idx)}>
                        <input type="checkbox" 
                               checked={val.active}
                               onChange={this.handleActive.bind(this, idx)} />
                        <span id="name">{val.name}</span><br/>
                        <div id="detail">

                            <input id="price"
                            	   type="number"
                            	   value={val.pricePerUnit}
                            	   onChange={this.handleDetailChange.bind(this, idx, 'pricePerUnit')} />
                            	
                            <span id="currency">{val.currency}</span>
                            <span id="x">X</span>
                            <input id="amount"
                            	   type="number"
                            	   value={val.amount}
                            	   onChange={this.handleDetailChange.bind(this, idx, 'amount')} />
                        </div>
                    </li>
                );
        });
		return (
			<ul>
            	{ showItems }
            </ul>
		);
	}
}

function getAll (state) {
	return {
		items: state.items,
		currencies: state.currencies
	};
}

export default connect(getAll)(ShowItems);