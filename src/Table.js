import React from 'react';
import CustomButton from './CustomButton'
import TableColumn from './TableColumn'

export default class Table extends React.Component
{
    render()
        {

            var columns =[];
            for(var i=0; i< this.props.allHeaders.length; i++) {
                columns.push(<TableColumn key={i} headerTitle={this.props.allHeaders[i]}/>);
            }


            return (

                <div>
                    <CustomButton className="btn add" onClick = {()=>this.props.addColumn()} text="add" />
                    <CustomButton className="btn minus" onClick = {()=>this.props.deleteColumn()} text="delete"/>

                    <div className = "table--content">
                        {columns}                      
                    </div>

                </div>

            )
        }

}