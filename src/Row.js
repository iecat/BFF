import React from 'react';
import Cell from './Cell';
import keydown from 'react-keydown';
export default class  Row extends React.Component
{
    render() {

        var row = [];
        var cellClass= '';

        for (var i = 0; i < this.props.noCol; i++)
        {
            cellClass = this.getCellClass(this.props.rowData[i]);
            row.push(<Cell key={i} cellClassName = {cellClass}/>);
        }

        return (  
            <div className="board-row">  
                {row}
            </div>
        )
    }

    
    getCellClass(cellValue)
    {
        if(cellValue)
        {
            if(cellValue =='H')
                return 'board-cell snake-head';
            if(cellValue == 'C')
                return 'board-cell cherry'
            if(cellValue == 'A')
                return 'board-cell la-bruja'
        }

        return 'board-cell';
    }

}