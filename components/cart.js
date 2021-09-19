import { Component } from 'react'
import Stripe from 'stripe'

export default class Cart extends Component {
	constructor() {
		super()
		// best practice. rlly.
		this.stripe = Stripe('sk_test_51JSNWTDT9A355JVpl53RvtVuyimZ247l8QYfj279xf0eOZSulVpf6s4ybynzZacNqW2gcWX802EJD91wVnIalFgd00GhZeBSPl');
	}

	calcTotal = () => {
		const { itemMap } = this.props
		let total = 0.0
		for (let key in itemMap) {
			total += itemMap[key].price / 100.0
		}
		return total
	}
	render() {
		const { itemMap } = this.props
		console.log(itemMap)
		console.log(Object.keys(itemMap))
		return (
			<div className="cart">
				{Object.keys(itemMap).map((id) => (
					<div className="cart-item cart-div">
						{itemMap[id].asset_description}
					</div>
				))}
				<div className="total cart-div">
					Total: ${this.calcTotal()}.00
				</div>
				<a href="https://buy.stripe.com/test_cN2eWhdhl0dE44o8ww">
					<button className="cart-div">
					Checkout
					</button>
				</a>
			</div>
		)
	}
}