
import React from 'react';

export default class Detail extends React.Component
{
    render()
    {
        const itemId = this.props.match.params.id;
        const item = this.props.allItems.find((i)=>{return i.key == itemId});

        return (
            <div>
                <div>
                    <img src={item.imgSrc} alt={item.imgAlt} />
                </div>





                {this.props.match.params.id }
                {item.alt}
            </div>
        )
    }
}