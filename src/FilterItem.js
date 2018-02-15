import React from 'react';
export default class FilterItem extends React.Component
{
    render()
    {
        return (
            <div className = {this.props.className} onClick={this.props.onClick}>
                <span value={this.props.itemValue}> {this.props.title} </span>
            </div>
            )
    }

}