import React from 'react';
export default class CustomButton extends React.Component
{
    render()
    {
        return (
            <a className = {this.props.className} onClick= {this.props.onClick}> {this.props.text} </a>
        )
    }
}