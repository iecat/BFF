import React from 'react';
import { Link } from 'react-router-dom';

export default class  MenuItem extends React.Component
{
    render()
    {
        return (
            <Link to={this.props.redirectPath} className = {this.props.className}>
                <div>                     
                    <span> 
                        {this.props.text} 
                    </span>               
                </div> 
            </Link>           
        )
    }
}
