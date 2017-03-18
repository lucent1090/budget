import React from 'react'
import { connect } from 'react-redux'
import { addCurrency, delCurrency } from './../actions/actions.js'
import { countries } from './country.js'

class Currency extends React.Component{

	constructor (props) {
		super(props);
		this.state = {
			selectedCountry: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleAddCurrency = this.handleAddCurrency.bind(this);
	}

	handleChange (e) {
		if( e.target.value != "" ){
			this.setState({selectedCountry: e.target.value});	
		}
	}

	handleAddCurrency (e) {
		let { currencies, dispatch } = this.props;
		let value = this.state.selectedCountry;
		if( (value != "") && !currencies.includes( value ) ){
			dispatch( addCurrency(this.state.selectedCountry) );
			this.setState({selectedCountry: ""});
		}
	}

	handleDelete (idx) {
		let { dispatch } = this.props;
		dispatch( delCurrency(idx) );
	}

	render () {
		let countryArr = countries.map((val, idx) => {
			return (
				<option key={idx} value={val.name}>{val.name+" "+val.fullname}</option>
			);
		});
		let money = this.props.currencies.map((val, idx) => {
			return (
				<p key={idx} 
				   onDoubleClick={this.handleDelete.bind(this, idx)}>
				   {val}
				</p>
			);
		});
		return (
			<div className='currency'>
				Currency: (Double click to remove unnecessary currency)
				<br/>
				<label>
					Add new currency:
					<select value={this.state.selectedCountry} onChange={this.handleChange}>
						{countryArr}
					</select>
					<button onClick={this.handleAddCurrency}>
						ADD
					</button>
				</label>
				{money}
			</div>
		);
	}
}

function getCurrency (state) {
	return {
		currencies: state.currencies
	};
}

export default connect(getCurrency)(Currency);