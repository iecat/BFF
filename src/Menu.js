import React from 'react';
import MenuItem from './MenuItem'
export default class  Menu extends React.Component
{
    render()
    {
        return (
            <div className = "menu--content">
                <MenuItem className="menuItem" text="Log In" redirectPath="/login" /> 
                <MenuItem className="menuItem" text="Log Out" redirectPath="/logout"/> 
                <MenuItem className="menuItem" text="Table"  redirectPath="/table"/> 
                 <MenuItem className="menuItem" text="Game"  redirectPath="/game"/> 
            </div>

        )
    }
}
