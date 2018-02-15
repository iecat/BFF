import React from 'react';
import ReactDOM from 'react-dom';
import {DATA} from './dummyData/carousel'
import {MostRecentItems} from './dummyData/mostRecent'
import {FilterItems} from './dummyData/filterItems'
 
class FetchData {
    
    getCarouselItems()
    {
        return DATA.carouselItems;
    }

    getMostRecentItems()
    {
        return MostRecentItems.items;
    }

    getMostViewedItems()
    {
        return MostRecentItems.items;
    }

    getFilterItems()
    {
        return FilterItems.items;
    }





    
    
    
    // getCarouselItems()
    // {
    //     console.log(DATA.carouselItems);
    //     this.setCarouselItemsState(DATA.carouselItems);
    // }

    // setCarouselItemsState(carouselItems)
    // {
    //     this.setState({
    //         caroulseItems: carouselItems
    //     });

    //     console.log(this.state.caroulseItems);
    // }

}


export function fetch()
{
    return new FetchData();
}