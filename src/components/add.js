import React from 'react'
import { connect } from 'react-redux'
import { addItem } from './../actions/actions.js'

class Add extends React.Component{

	constructor (props) {
		super(props);

		this.state = {
			error: [false, false, false, false],
			checkedMoney: ''
		};

		this.handleAdd = this.handleAdd.bind(this);
		this.checkValid = this.checkValid.bind(this);
	}

	handleChange (field) {
		let error = this.state.error;
		switch(field){
			case 'name':
				error[0] = false;
				this.setState({error: error});
				return ;
			case 'pricePerUnit':
				error[1] = false;
				this.setState({error: error});
				return ;
			case 'amount':
				error[3] = false;
				this.setState({error: error});
				return ;
			default:
				return error;
		}
	}

	handleSelectMoney (val) {
		this.setState({checkedMoney: val});
	}

	checkValid () {

		let error = [
			(this.refs.name.value=="")?true:false ,
			(this.refs.pricePerUnit.value <= 0)?true:false ,
			false ,
			(this.refs.amount.value <= 0)?true:false
		];
		
		this.setState({error: error});
		return !error.includes(true);
	}

	handleAdd (e) {
		let { dispatch } = this.props;

		if( this.checkValid() ){

			let newItem = {
				active: true,
				name: this.refs.name.value,
				pricePerUnit: this.refs.pricePerUnit.value,
				currency: this.state.checkedMoney,
				amount: this.refs.amount.value
			};

			dispatch( addItem(newItem) );

			this.refs.name.value="";
			this.refs.pricePerUnit.value="";
			this.setState({checkedMoney: ""});
			this.refs.amount.value=1;
		}
		
	}

	render () {
		let money = this.props.currencies.map((val, idx) => {
			return (
				<label key={idx}>
				<input type="radio"
					   checked={this.state.checkedMoney == val}
					   onChange={this.handleSelectMoney.bind(this, val)} />
				{val}
				</label>
			);
		});
		let style = {
			borderColor: 'red'
		};
		return(
			<div className="add">
				<input type="text"
					   ref="name"
					   style={this.state.error[0]?style:null}
					   placeholder="Name"
					   onChange={this.handleChange.bind(this, 'name')} />

				<input type="number" 
					   placeholder="0"
					   ref="pricePerUnit"
					   style={this.state.error[1]?style:null}
					   onChange={this.handleChange.bind(this, 'pricePerUnit')} />

				{money}
				
				<input type="number" 
					   ref="amount"
					   style={this.state.error[3]?style:null}
					   placeholder="1" 
					   onChange={this.handleChange.bind(this, 'amount')}/>  

				<button onClick={this.handleAdd}>
					ADD
				</button>
			</div>
		);
	}
}

function getCurrencies (state) {
	return {
		currencies: state.currencies
	};
}

export default connect(getCurrencies)(Add);