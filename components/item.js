import { Component } from 'react'

export default class Item extends Component {
	render() {
		const { item, added, addToCart } = this.props
		const price = item.price / 100;
		return (
			<div className="item">
				<img src="images/pic.png" className="item-pic" />
				{ item.asset_description }
				<div className="item-lower">
					<div className="item-lower-left">
						{ `$${price}` }
					</div>
					<div className="item-lower-right">
						<button className="add-to-cart" disabled={added} onClick={() => addToCart(item)}>
						{ added ? 'Added' : 'Add to cart' }
					</button>
					</div>
				</div>
			</div>
		)
	}
}