import { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import classnames from 'classnames'

import Cart from "./cart"
import Item from "./item"
import MenuBar from "./menubar"

export default class Page extends Component {
	state = {
		cartOpen: false,
		itemMap: {},
		assetDescription: "",
		assetManufacturer: "",
		assetModel: "",
		partType: "",
		partDescription: "",
		items: this.props.items
	}

	toggleCart = () => this.setState({ cartOpen: !this.state.cartOpen})

	addToCart = (item) => {
		let newItemMap = this.state.itemMap;
		newItemMap[item.id] = item
		this.setState({ itemMap: { ...this.state.itemMap, [item.id]: item } });
	}

	// TODO: Generalize to all property names
	filterAssetDescription = (items, value) => items.filter(x => x.asset_description === value)

	filterAssetManufacturer = (items, value)  => items.filter(x => x.asset_manufacturer === value)

	filterAssetModel = (items, value)  => items.filter(x => x.asset_model === value)

	filterPartType = (items, value)  => items.filter(x => x.part_type === value)

	filterPartDescription = (items, value)  => items.filter(x => x.part_description === value)

	getAssetDescriptions = (items, value) => {
		const result =  Array.from(new Set(items.map(item => item.asset_description)))
		console.log(result)
		return result
	}

	getAssetManufacturers = (items, value) => (
		Array.from(new Set(items.map(item => item.asset_manufacturer)))
	)
	getAssetModels = (items, value) => (
		Array.from(new Set(items.map(item => item.asset_model)))
	)
	getPartTypes = (items, value) => (
		Array.from(new Set(items.map(item => item.part_type)))
	)
	getPartDescriptions = (items, value) => (
		Array.from(new Set(items.map(item => item.part_description)))
	) 

	hadleAssetDescriptionSelect = (value) => {
		let nextItems = [...this.state.items]
		this.setState({ 
			items: this.filterAssetDescription(nextItems, value),
			assetDescription: value,
			assetManufacturer: '',
			assetModel: '',
			partType: '',
			partModel: ''
		})
	}

	hadleAssetManufacturerSelect = (value) => {
		let nextItems = [...this.state.items]
		this.setState({ 
			items: this.filterAssetManufacturer(nextItems, value),
			assetManufacturer: value,
			assetModel: '',
			partType: '',
			partModel: '' 
		})
	}

	hadleAssetModelSelect = (value) => {
		let nextItems = [...this.state.items]
		this.setState({ 
			items: this.filterAssetModel(nextItems, value),
			assetModel: value,
			partType: '',
			partModel: ''
		})
	}

	handlePartTypeSelect = (value) => {
		let nextItems = [...this.state.items]
		this.setState({ 
			items: this.filterPartType(nextItems, value),
			partType: value,
			partModel: ''
		})
	}

	handlePartDescriptionSelect = (value) => {
		let nextItems = [...this.state.items]
		this.setState({ 
			items: this.filterPartDescription(nextItems, value),
			partModel: value
		})
	}


	render() {
		const { cartOpen, itemMap, items } = this.state
		console.log(this.state.assetManufacturer)
		return (
			<div className="page">
				<MenuBar toggleCart={this.toggleCart} />
				<div className="fake-menubar" />
				<div className="page-content">
					{ cartOpen && <Cart itemMap={itemMap} />}
					<div className="filter-section">
					<div className='filter'>
							<input 
								onchange={e => this.setState({ assetDescription: e.target.value })} 
								value={this.state.assetDescription} 
								placeholder="Asset Description" 
								className="filter-input"
			
							/>
							<div className="selections">
								{ this.getAssetDescriptions(items).map((x, i) => (
						    	<div id={i} className="dropdown-item">
					    			<button className="filter-button"  onClick={() => this.hadleAssetDescriptionSelect(x)}>
					    				{ x }
					    			</button>
					    		</div>
						    ))}
							</div>
						</div>
						<div className='filter'>
							<input 
								onchange={e => this.setState({ assetManfacturer: e.target.value })} 
								value={this.state.assetManufacturer} 
								placeholder="Asset Manufacturer" 
								className="filter-input"
								disabled={!this.state.assetDescription}
							/>
							<div className="selections">
								{ this.getAssetManufacturers(items).map((x, i) => (
						    	<div id={i} className="dropdown-item">
					    			<button className="filter-button"  onClick={() => this.hadleAssetManufacturerSelect(x)} disabled={!this.state.assetDescription}>
					    				{ x }
					    			</button>
					    		</div>
						    ))}
							</div>
						</div>
				
						<div className='filter'>
							<input 
								onchange={e => this.setState({ assetModel: e.target.value })} 
								value={this.state.assetModel} 
								placeholder="Asset Model" 
								className="filter-input"
								disabled={!this.state.assetManufacturer}
							/>
							<div className="selections">
								{ this.getAssetModels(items).map((x, i) => (
						    	<div id={i} className="dropdown-item">
					    			<button className="filter-button"  onClick={() => this.hadleAssetModelSelect(x)} disabled={!this.state.assetManufacturer}>
					    				{ x }
					    			</button>
					    		</div>
						    ))}
							</div>
						</div>
						<div className='filter' disabled={!this.state.assetModel}>
							<input 
								onchange={e => this.setState({ partType: e.target.value })} 
								value={this.state.partType} 
								placeholder="Part Type"
								className="filter-input" 
							/>
							<div className="selections">
								{ this.getPartTypes(items).map((x, i) => (
						    	<div id={i} className="dropdown-item">
					    			<button className="filter-button"  onClick={() => this.handlePartTypeSelect(x)} disabled={!this.state.assetModel}>
					    				{ x }
					    			</button>
					    		</div>
						    ))}
							</div>
						</div>
						<div className='filter' disabled={!this.state.partType}>
							<input 
								onchange={e => this.setState({ partDescription: e.target.value })} 
								value={this.state.partType} 
								placeholder="Part Description" 
								className="filter-input"
							/>
							<div className="selections">
								{ this.getPartDescriptions(items).map((x, i) => (
						    	<div id={i} className="dropdown-item">
					    			<button className="filter-button" onClick={() => this.handlePartDescriptionSelect(x)} disabled={!this.state.partType}>
					    				{ x }
					    			</button>
					    		</div>
						    ))}
							</div>
						</div>
					</div>

					<br />
					<div className="results">
				    {
				    	items.map((item, i) => (
				            <Item item={item} added={!!itemMap[item.id]} addToCart={this.addToCart} />
				  		))
			    	}
			    	</div>
			    </div>
			</div>
		)
	}
}