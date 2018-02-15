import React from 'react'
import List from './List'
import Filter from './Filter'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

export default class Home extends React.Component
{
    render()
    {
        return (
            <div>
                <div>
                    <List title ="Most recently" items={this.getFilteredMostRecent()}  
                    moveItem={(dragIndex, hoverIndex)=>this.props.moveMostRecentItems(dragIndex, hoverIndex)}
                    findItem={(id) =>this.props.findItem(id)}/>
                </div>
                <div>
                    <List title ="Most viewed" items={this.props.mostViewedItems} 
                    moveItem={(dragIndex, hoverIndex)=>this.props.moveMostRecentItems(dragIndex, hoverIndex)}
                    findItem={(id) =>this.props.findItem(id)}/>
                </div>                    
                <Filter filterItems={this.props.filterItems} setFilterValue={(index)=>this.props.setFilterValue(index)} />
            </div>
            )
    }

    getFilteredMostRecent()
    {
        const result = this.props.selectedFilterValue == 0 ? this.props.mostRecentItems: this.props.mostRecentItems.filter((element)=>{
                return element.key == this.props.selectedFilterValue;
            });
        return result;
    }
}


//export default DragDropContext(HTML5Backend)(Home);