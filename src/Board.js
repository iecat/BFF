import React from 'react';
import Row from './Row';
import keydown from 'react-keydown';
import {Directions} from './Helper';
import ReactDOM from 'react-dom';

// @keydown
export default class Board extends React.Component
{
    constructor() {

        super();
        this.state = {
            noColumns: 7,
            noRows: 7,
            squares: [],
            fassolliniPos: 13,
            cherryPos: 31,
            score: 0,
            agataPositions: [],
            level: 1
        }


        this.moveFassollini = this.moveFassollini.bind(this);
        this.isFelipeInsideSquare = this.isFelipeInsideSquare.bind(this);
        this.addAgatitaLaBruja = this.addAgatitaLaBruja.bind(this);
        this.moveAgatitaLaBrujita = this.moveAgatitaLaBrujita.bind(this);
        this.getRandomPositionForAgatita = this.getRandomPositionForAgatita.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.generateFoodPosition = this.generateFoodPosition.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
        this.timer = setInterval(this.moveAgatitaLaBrujita, 400);         
    }

    componentDidMount() {

        var tempSqaures = this.state.squares;
        tempSqaures = Array(this.state.noColumns * this.state.noRows).fill('0');

        var tempAgatitaPositions =  this.state.agataPositions;
        tempAgatitaPositions.push(3);
    

        tempSqaures[this.state.fassolliniPos] = 'H';
        tempSqaures[this.state.cherryPos] = 'C';
        tempSqaures[tempAgatitaPositions[0]] = 'A'

        this.setState({
            squares: tempSqaures
        });
    }

    componentWillUnmount() {
         document.removeEventListener("keydown", this.onKeyPressed.bind(this));
        clearInterval(this.timer);
    }

    componentDidUpdate()
    {
        if(this.state.score == (15 * this.state.level))
        {
            this.levelUp();
        }  
    }

    
     render() {

         var board =[];
         var rowData = [];
         var startIndex =0;
         var sqrs = this.state.squares;

         for(var i = 0; i < this.state.noRows; i++)
         {
            startIndex  = i*this.state.noColumns;
            rowData = sqrs.slice(startIndex, startIndex + this.state.noColumns);
            board.push(<Row key={i} noCol={this.state.noColumns} rowData={rowData}/>)
         }

        return(
            <div className="main-content">
                <div className="board-content" >
                    {board}
                </div>

                <div className="board-info">
                    <div>
                        Level : {this.state.level}
                    </div>
                    <div>
                        Big Fassollini, you caught {this.state.score} X 2 cherries
                    </div>
                </div>  
            </div>
            )

     }

     onKeyPressed(ev)
     {

         console.log('yuppy');
         var fasoDirection = '';
         if(ev.key =='ArrowUp') fasoDirection = Directions.UP;
         else if (ev.key == 'ArrowDown') fasoDirection = Directions.DOWN;
         else if (ev.key == 'ArrowLeft') fasoDirection = Directions.LEFT;
         else if (ev.key == 'ArrowRight') fasoDirection = Directions.RIGHT;
         
         this.moveFassollini(fasoDirection);
     }

     moveFassollini(direction)
     {
         if(direction != '')
         {
            const currentPosition = this.state.fassolliniPos;
            var tempSquares = this.state.squares;
            var foodPosition = this.state.cherryPos;
            var newScore = this.state.score;

            var newPosition;

            if(direction == Directions.UP)
            {
                newPosition = currentPosition - this.state.noColumns;
            }
            if(direction == Directions.DOWN)
            {
                newPosition = currentPosition + this.state.noColumns;
            }

            if(direction == Directions.LEFT)
            {
                newPosition = currentPosition -1;
            }
            if(direction == Directions.RIGHT)
            {
                newPosition = currentPosition + 1;
            }

            // don't let felipe move outside square !!!
            if(!this.isFelipeInsideSquare(newPosition, currentPosition))
            {
                //this.props.openPopUp(false);
                newPosition = currentPosition;
            }

            // check if La Bruja ate poor Fassollini
            if(tempSquares[newPosition] == 'A')
            {
                this.gameOver();
                newPosition = -500;
            }

            //yuppy Fassollini got cherries
            if(newPosition == foodPosition)
            {
                tempSquares[foodPosition] = 'H';
                foodPosition = this.generateFoodPosition(newPosition); //Math.floor(Math.random() * Math.floor(this.state.noColumns * this.state.noRows));
                tempSquares[foodPosition] ='C';
                newScore ++;
               // this.props.openPopUp(true);
            }

        //  if(newPosition != currentPosition)
        //    {
                tempSquares[currentPosition] = '0';
                tempSquares[newPosition] = 'H';
                tempSquares[foodPosition] = 'C';


            
            console.log('move faso ');
            console.log(this.state.fassolliniPos);
            console.log(newPosition);
            console.log(tempSquares);
            console.log('--------------');
             
                this.setState({
                    squares: tempSquares,
                    fassolliniPos: newPosition,
                    cherryPos: foodPosition,
                    score: newScore
                });
           //}
         }
     }


    isFelipeInsideSquare(newPos, currentPosition)
     {

        if(newPos <0 || newPos > this.state.noColumns*this.state.noRows -1)
        {
            return false;
        } 

        for(var i=0; i< this.state.noRows; i++)
        {
            const leftEdgePosition = i*this.state.noColumns;
            const rightEdgePosition = leftEdgePosition + this.state.noColumns -1;

            if(currentPosition == leftEdgePosition && (newPos == leftEdgePosition-1))
            {
                return false;
            }
            
            if(currentPosition == rightEdgePosition && (newPos == rightEdgePosition+1))
            {
                return false;
            }

        }





        // // check boundaries :  up and down
        // if(newPos <0 || newPos > this.state.noColumns*this.state.noRows -1)
        // {
        //     return false;
        // }

        // // check left & right
        // for(var i=0; i< this.state.noRows; i++)
        // {
        //     var pos = i*this.state.noColumns +  this.state.noColumns;

        //     if(currentPosition == pos && newPos == (pos -1))
        //     {
        //         return false;
        //     }
        //     if((currentPosition == (pos-1)) && newPos == pos)
        //     {
        //         return false;
        //     }
        // }

         return true;
     }


     generateFoodPosition(fassoliniPosition)
     {
        var foodPos =  Math.floor(Math.random() * Math.floor(this.state.noColumns * this.state.noRows));
        while((foodPos==fassoliniPosition) || (this.state.agataPositions.indexOf(foodPos)>=0))
        {
            foodPos =  Math.floor(Math.random() * Math.floor(this.state.noColumns * this.state.noRows));
        }
        console.log("food pos");
        console.log(foodPos);
        return foodPos;
     }




    //  isFelipeInsideSquare(currentPosition, newPosition)
    //  {
    //      console.log('position');
    //      console.log(currentPosition);
    //       console.log(newPosition);
 

    //     for(var i=0; i<this.state.noRows; i++)
    //     {
    //          const leftEdgePosition = i*this.state.noColumns;
    //          const rightEdgePosition = leftEdgePosition + this.state.noColumns -1;

    //          if(currentPosition == leftEdgePosition && newPosition<leftEdgePosition)
    //          {
    //              return false;
    //          }

    //          if(currentPosition == rightEdgePosition && newPosition > rightEdgePosition)
    //          {
    //              return false;
    //          }
    //     }

    //     return true;
    //  }




    //       isFelipeInsideSquare(newPos, currentPosition)
    //  {
    //     // check boundaries : check up and down
    //     if(newPos <0 || newPos > 41)
    //     {
    //         return false;
    //     }

    //     // check left & right
    //     for(var i=0; i< this.state.noRows; i++)
    //     {
    //         var pos = i*this.state.noColumns +  this.state.noColumns;

    //         if(currentPosition == pos && newPos == (pos -1))
    //         {
    //             return false;
    //         }
    //         if((currentPosition == (pos-1)) && newPos == pos)
    //         {
    //             return false;
    //         }
    //     }

    //      return true;
    //  }

     addAgatitaLaBruja(noColumns, noRows, tempSqares)
     {
         const codePositions = ['A', 'C', 'H'];
         var agatitaPopsition = Math.floor(Math.random() * Math.floor(noColumns * noRows));

         // make sure initially agatita starts on an empty square
         while(codePositions.indexOf(tempSqares[agatitaPopsition]) >= 0)
         {
            agatitaPopsition = Math.floor(Math.random() * Math.floor(noColumns * noRows));
         }
        
        return agatitaPopsition;
     }

     moveAgatitaLaBrujita()
     {
        var newAgatitaPositions = [];
        var tempSqares = this.state.squares;
        var agatitaNewPosition = -1;
        var agatitaCurrentPosition = 0;
        var felipePosition = this.state.fassolliniPos;

        for(var i=0; i< this.state.agataPositions.length; i++)
        {
            agatitaCurrentPosition = this.state.agataPositions[i];
            agatitaNewPosition = this.getRandomPositionForAgatita(agatitaCurrentPosition);
            newAgatitaPositions.push(agatitaNewPosition);

            if(tempSqares[agatitaNewPosition] == 'H')
            {
                this.gameOver();
                felipePosition = -500;
            }

            //update squares
            tempSqares[agatitaCurrentPosition] = '0';
            tempSqares[agatitaNewPosition] = 'A';
        }

        // console.log('move agatita ');
        // console.log(tempSqares);
        // console.log('--------------')

        this.setState({
            squares: tempSqares,
            agataPositions: newAgatitaPositions,
            fassolliniPos: felipePosition
        });
     }

    getRandomPositionForAgatita(currentPos)
     {
        //var currentPos = this.state.prevAgataPos;
        var tempSqares = this.state.squares;

        var possiblePositions = [];
        const maxLimit = this.state.noColumns * this.state.noRows - 1;


        var upPosition = currentPos - this.state.noColumns;
        var leftPosition = currentPos - 1;
        var rightPosition = currentPos + 1;
        var downPosition = currentPos + this.state.noColumns;

        if(upPosition >=0) { possiblePositions.push(upPosition); };
        if(currentPos % this.state.noColumns != 0) { possiblePositions.push(leftPosition); }
        if(currentPos % this.state.noColumns != (this.state.noColumns -1)) { possiblePositions.push(rightPosition); }
        if(downPosition <= maxLimit) { possiblePositions.push(downPosition); }


        var randomIndex = Math.floor(Math.random() * Math.floor(possiblePositions.length));

         while (tempSqares[possiblePositions[randomIndex]] == 'C' || tempSqares[possiblePositions[randomIndex]] == 'A' )
         {
            randomIndex = Math.floor(Math.random() * Math.floor(possiblePositions.length));
         }
        
        return possiblePositions[randomIndex];
     }

    gameOver()
     {
        clearInterval(this.timer);
        return -100;
     }


    levelUp()
    {
        const newLevel = this.state.level +1;
        var newColumns =  this.state.noColumns + 1;
        var newRows = this.state.noRows + 1;
        var newAgatitaPositions = this.state.agataPositions;        
        var newSqares = Array(newColumns * newRows).fill('0');
        newAgatitaPositions.push(this.addAgatitaLaBruja(newColumns,  newRows, newSqares));
        
        newSqares[this.state.cherryPos] = 'C';
        newSqares[this.state.fassolliniPos] = 'H';
        for(var i=0; i<newAgatitaPositions.length; i++)
        {
            newSqares[newAgatitaPositions[i]] = 'A';
        }
        
        this.setState({
            squares: newSqares,
            agataPositions: newAgatitaPositions,
            level: newLevel
            // noColumns: newColumns,
            // noRows: newRows
        });
    } 

    

}

