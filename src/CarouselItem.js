import React from 'react';
import ReactDOM from 'react-dom';

export default class CarouselItem extends React.Component
{
    render()
    {
        return (
            <a href={this.props.itemLink}>
                <img src={this.props.imgSrc} alt={this.props.imgAlt} />
            </a>
        );
    }
} 