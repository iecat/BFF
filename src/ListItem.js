import React from 'react';
import { Link } from 'react-router-dom';
import {ItemTypes} from './Helper';
import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'

const itemSource = {

    beginDrag(props)
    {

        const x = props.findItem(props.id);
        // console.log('beginDrag');
        // console.log(props.id);
        // console.log(x.index);

        return {
            id: props.id,
            index: props.findItem(props.id).index
        }
    },

    endDrag(props, monitor)
    {
        // // console.log('endDrag');
        // // console.log(monitor.getItem());

        // const { id: droppedId, index } = monitor.getItem();
        // const didDrop = monitor.didDrop();
        
        // //if (!didDrop) {
        //     if(droppedId !== index)
        //     {
        //         props.moveItem(droppedId, index);
        //     }
        // //} 
    }
};

const itemTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findItem(overId);
        props.moveItem(draggedId, overIndex);
    }
  }
};


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

function collect2(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}




// function collect2(connect, monitor) {
//     return {
//         connectDragSource: connect.dragSource(),
//         isDragging: monitor.isDragging()
//     }
// }


// // DropTarget(ItemTypes.MOSTRECENT, itemTarget, connect => ({
// // 	connectDropTarget: connect.dropTarget(),
// // }))(ListItem)

// // DragSource(ItemTypes.MOSTRECENT, itemSource, (connect, monitor) => ({
// // 	connectDragSource: connect.dragSource(),
// // 	isDragging: monitor.isDragging(),
// // }))(ListItem)



class ListItem extends React.Component
{
    constructor(props)
    {
        super(props);

    }  

    // static propTypes = {
    //     connectDragSource: PropTypes.func.isRequired,
	// 	// connectDropTarget: PropTypes.func.isRequired,
	// 	index: PropTypes.number.isRequired,
	// 	isDragging: PropTypes.bool.isRequired,
	// 	id: PropTypes.any.isRequired
    //     // moveItem: PropTypes.func.isRequired,
    // }

    render()
    {
         const { isDragging, connectDragSource, connectDropTarget } = this.props
         //console.log(this.props.indexId)

        // console.log(this.props);


        // var connectDragSource = this.props.connectDragSource;
        // var connectDropTarget = this.props.connectDropTarget;

        // var isDragging = this.props.isDragging;




        const opacityVal = isDragging ? 0 : 1;

        return connectDragSource(
            connectDropTarget(
                <div style ={{opacity: opacityVal, cursor:'move'}} className = {this.props.className}>
                    <Link to={"/detail/"+this.props.id}>
                        <img src={this.props.imgSrc} alt={this.props.imgAlt} />
                        <span> {this.props.title} </span>
                    </Link>
                </div> ))
    }
}

const x = DropTarget(ItemTypes.MOSTRECENT, itemTarget, collect )(ListItem)
export default DragSource(ItemTypes.MOSTRECENT, itemSource, collect2 )( x )


//export default DragSource(ItemTypes.MOSTRECENT, itemSource, collect)(ListItem)



// function ItemDndDecorator(component, itemType) {
//   return (
//     DropTarget(itemType, itemTarget, connect => ({
//       connectDropTarget: connect.dropTarget(),
//     })),
//       DragSource(itemType, itemSource, (connect, monitor) => ({
//         connectDragSource: connect.dragSource(),
//         isDragging: monitor.isDragging(),
//       }))
//   )(ListItem)
// }



// export default configureDragDrop(ListItem,
//   register => register.DropTarget(ItemTypes.MOSTRECENT, itemTarget, connect => ({
//                         connectDropTarget: connect.dropTarget()
//                 })),
// register =>register.DragSource(ItemTypes.MOSTRECENT, itemSource, (connect, monitor) => ({
// 	connectDragSource: connect.dragSource(),
// 	isDragging: monitor.isDragging(),
// }))
// )(ListItem)

// export {ItemDndDecorator, ListItem}