import React from 'react';
import FilterItem from './FilterItem'
export default class Filter extends React.Component
{
    render()
    {
        return (
            <div className="filter">
                <div className="filter--header">{this.props.title}</div>
                <div className="filter--items">               
                    { this.props.filterItems.map((item, index) => (
                        <FilterItem key={item.value} className="filter--item" title={item.text} itemValue={item.value} onClick={()=>{this.props.setFilterValue(item.value)}}/>
                    ))}
                </div>
            </div>
        )
    }

}