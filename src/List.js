import React from 'react';
import ListItem from './ListItem'
import { Link } from 'react-router-dom';

import ItemTypes from './Helper';
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



class List extends React.Component
{
    constructor(props)
    {
        super(props);
    }  

    render()
    {
        const { connectDropTarget } = this.props 
        
        return (
            <div className="list">
                <div className="list--header">{this.props.title}</div>
                <div className="list--items">               
                    { this.props.items.map((item, i) => (
                        <ListItem key={i} imgSrc ={item.imgSrc} imgAlt = {item.imgAlt} title={item.alt} alt ={item.alt} className="list--item" index = {i}
                        id={item.key} moveItem={(dragIndex, hoverIndex)=>this.props.moveItem(dragIndex, hoverIndex)} findItem={(id)=>this.props.findItem(id)}/>
                    ))}
                </div>
                     <Link to={"/viewall/"}>
                        <span>View more...</span>
                    </Link>
            </div>)
        
    }

}


const itemListTarget = {
    drop(props, monitor, component)
    {
        const dragIndex = monitor.getItem().id;
		const hoverIndex = props.id;
        
        // console.log('drop');
        // console.log(monitor.getItem());
        //console.log(props);
    }
}




const itemTarget = {

    hover(props, monitor, component) {

        // console.log(monitor.getItem());
        // console.log(props.id);

		const dragIndex = monitor.getItem().id;
		const hoverIndex = props.id;

        // console.log(dragIndex);
        // console.log(hoverIndex);

        if (dragIndex === hoverIndex) {
			return
		}

        // // Determine rectangle on screen
		// const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// // Get vertical middle
		// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// // Determine mouse position
		// const clientOffset = monitor.getClientOffset()

		// // Get pixels to the top
		// const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// // Only perform the move when the mouse has crossed half of the items height
		// // When dragging downwards, only move when the cursor is below 50%
		// // When dragging upwards, only move when the cursor is above 50%

		// // Dragging downwards
		// if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		// 	return
		// }

		// // Dragging upwards
		// if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		// 	return
		// }

        props.moveItem(dragIndex, hoverIndex);
      
        monitor.getItem().index = hoverIndex;
    }
}







function collect(connect, monitor) {
 return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    }
}


//export default DropTarget(ItemTypes.MOSTRECENT, itemListTarget, collect)(List)

export default DragDropContext(HTML5Backend)(List)

