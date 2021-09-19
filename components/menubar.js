import { Component } from 'react'

export default class MenuBar extends Component {
	render() {
		const { toggleCart } = this.props
		return (
			<div>
				<div className="menubar">
					<div className="menubar-left">
						Medical Accessories & Parts
					</div>
					<div className="menubar-center">
						<input className="search" />
					</div>
					<div className="menubar-right" onClick={toggleCart}>
						Cart
					</div>
				</div>
			</div>
		)
	}
}