import React from 'react';
export default class TableColumn extends React.Component
{
        render()
        {
            return (
                <div className ="column">
                    <div>
                       {this.props.headerTitle}
                    </div>
                    <div>
                        cell 1
                    </div>
                    <div>
                        cell 2
                    </div>
                </div>
            )
        }
}