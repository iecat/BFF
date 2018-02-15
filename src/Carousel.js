import React from 'react';
import ReactDOM from 'react-dom';
import CarouselItem from './CarouselItem'
import CustomButton from './CustomButton'

export default class Carousel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentSlide: 0
        }

        //in es6 react component doesn't autobind method to itself. Required to do it manually.
        this.nextSlide = this.nextSlide.bind(this);
    }


    componentWillMount() {

        this.timer = setInterval(this.nextSlide, 5000);
    }

    componentWillUnmount(){

        clearInterval(this.timer);
    }
    
    render()
    {
        return (
                <div className="carousel-container">
                    <ul>
                    { this.props.caroulseItemsData.map((item, index) => (
                        index===0 ? <li id={index} className="item fade active" key={item.key}><CarouselItem itemLink={item.itemLink} imgSrc={item.imgSrc} alt={item.alt} /></li> :
                        <li  id={index} className="item fade hide" key={item.key}><CarouselItem itemLink={item.itemLink} imgSrc={item.imgSrc} alt={item.alt} /></li>   
                    ))}
                    </ul>
                <CustomButton className="prev" onClick = {()=>this.showSlide(-1)} text="back" />
                <CustomButton className="next" onClick = {()=>this.showSlide(1)} text="next"/>
            </div>
        )
    }


    nextSlide() {

        var slides = document.getElementsByClassName("fade");

        slides[this.state.currentSlide].classList.remove("active");
        slides[this.state.currentSlide].classList.add("hide");

        const currentSlideValue = (this.state.currentSlide+1)%slides.length;

        slides[currentSlideValue].classList.remove("hide");
        slides[currentSlideValue].classList.add("active");

        this.setState({
            currentSlide: currentSlideValue
        });
    }

   showSlide(n)
   {
        var items = document.getElementsByClassName("fade");

        var activeSlides = document.getElementsByClassName("active");
        var currentSlide = activeSlides[0];

        if(currentSlide !== 'undefined')
        {
            currentSlide.classList.remove("active");          
            currentSlide.classList.add("hide");

            var currentIndex = parseInt(currentSlide.id);
            currentIndex += n;

            if( currentIndex >= items.length)
            {
                currentIndex = 0;
            }
            if ( currentIndex < 0)
            {
                currentIndex = items.length -1;
            }

            items[currentIndex].classList.remove("hide");
            items[currentIndex].classList.add("active");

            this.setState({
                currentSlide: currentIndex
            });
        }
    }
} 

