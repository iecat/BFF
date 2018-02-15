import React from 'react';
import Menu from './Menu'
import Carousel from './Carousel'
import './index.css';
import {fetch}  from './FetchData'
 import Home from './Home'
import Detail from './Detail'
import Main from './Main'
import ViewMore from './ViewMore'
import Login from './Login'
import Table from './Table'
import Modal from './Modal'
import Board from './Board'

import {Route, Router} from 'react-router-dom'
import { DragDropContext } from 'react-dnd'
import keydown from 'react-keydown';
import ModalGame from './ModalGame';



export default class App extends React.Component
{

    constructor() {
        super();
        this.state = {
            carouselItems: [],
            mostRecentItems:[],
            mostViewedItems:[],
            filterItems:[],
            selectedFilterValue:0,
            tableNoColumn: 3,
            tableNoRows: 2,
            isOpen : false,
            headers: ["Header1", "Header2", "Header3"],
            newHeaderValue: '',
            isGameDialogOpen: false,
            successMessage: true
        };

        this.addColumn = this.addColumn.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onModalSave = this.onModalSave.bind(this);
        this.toggleGameModal = this.toggleGameModal.bind(this);
    }

    componentDidMount() {
        const fetchObj = fetch();
        this.setState({
            carouselItems: fetchObj.getCarouselItems(),
            mostRecentItems: fetchObj.getMostRecentItems(),
            mostViewedItems: fetchObj.getMostViewedItems(),
            filterItems: fetchObj.getFilterItems()
        });
    }



    render() {

        const homeProps = {
            mostViewedItems:this.state.mostViewedItems,
            filterItems: this.state.filterItems,
            selectedFilterValue: this.state.selectedFilterValue,
            mostRecentItems: this.state.mostRecentItems,
            setFilterValue:(index)=>this.setFilterValue(index),
            moveMostRecentItems:(dragIndex, hoverIndex) =>this.moveMostRecentItems(dragIndex, hoverIndex),
            findItem: (id) =>this.findItem(id)
        }







        return (
            <div>
                <Menu />
                {/*<Carousel caroulseItemsData={this.state.carouselItems} />*/}
                {/*<Router>*/}
                    <Route exact path="/" render={()=><Home {...homeProps}/>} />
                    <Route path="/detail/:id" render={(props)=><Detail {...props} allItems ={this.state.mostRecentItems}/>} />
                    <Route path="/viewall" render={()=><ViewMore/>}/>
                    <Route path="/login" render={()=><Login/>}/>
                    <Route path="/table" render={()=><Table noColumns={this.state.tableNoColumn} allHeaders={this.state.headers} addColumn={this.addColumn} deleteColumn={this.deleteColumn}  />}/>
                    <Route path="/game" render={()=><Board openPopUp={(m)=>this.openGameModalwithMessage(m)}/>}/>
                {/*</Router>*/}
                <Modal show={this.state.isOpen} onClose={this.toggleModal} onSave={this.onModalSave} handleOnChange={(evt)=>this.onChangeInputValue(evt)}>
                        Here's some content for the modal
        
                </Modal>
                <ModalGame show={this.state.isGameDialogOpen} onClose={this.toggleGameModal} isSuccess= {this.state.successMessage}>   
                </ModalGame>




            </div>

        )
    }

    setFilterValue(index)
    {
        this.setState({
            selectedFilterValue: index
        });
    }

    moveMostRecentItems(id, hoverIndex)
    {


        const x =  this.state.mostRecentItems[hoverIndex];
        const xx  = this.findItem(id);

        const allrecentItems =  this.state.mostRecentItems;
        allrecentItems.splice(hoverIndex, 1);
        allrecentItems.splice(xx.index, 0, x);

        this.setState({
            mostRecentItems: allrecentItems
        });
    }

    findItem(id)
    {
        const items = this.state.mostRecentItems;
        const item = items.filter(i=>i.key === id)[0];
         return {
            item,
            index: items.indexOf(item)
        };
    }

    addColumn()
    {
        this.toggleModal();
    }

    deleteColumn()
    {
        const headers = this.state.headers;
        headers.pop();
        
        this.setState({
            inputValue: headers
        });

        // let noCol = this.state.tableNoColumn;
        // if(noCol <= 0) noCol = 1;
        //   this.setState({
        //     tableNoColumn: noCol - 1
        // });
    }

    onModalSave( )
    {
        this.toggleModal();

        if(this.state.newHeaderValue !='')
        {
            const headersAll = this.state.headers;
            headersAll.push(this.state.newHeaderValue);

            this.setState({
                headers: headersAll
            });
        }
    }

    onChangeInputValue(evt)
    {
        const newHeader = evt.target.value;

        this.setState({
                newHeaderValue: newHeader
            });
        
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openGameModalwithMessage(isSuccess)
    {
        this.setState({
            successMessage: isSuccess
        });

        this.toggleGameModal();
    }

    toggleGameModal() {
        this.setState({
            isGameDialogOpen: !this.state.isGameDialogOpen
        });
    }

    getpopupMessage()
    {
        if(this.state.successMessage !== false)
            return 'Well done!! Happy?? You got all the foooood !!!!'
        else
            return 'hey hey hey, watch your limits Mister !!!'
    }



}


//https://www.howtucode.com/react-dnd-uncaught-typerrors-trying-to-follow-the-simple-sortable-example-238548.html