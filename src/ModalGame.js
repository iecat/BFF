import React from 'react';
export default class  ModalGame extends React.Component
{
    constructor(props)
    {
        super(props);


    }

    render() {


        var newClass = this.props.isSuccess === true? "party": "no-party";

        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop" >
                <div className="modal-game" >
                    <div className ="dialogTitle">
                        {this.props.isSuccess === true ?  'Well done!! Game over!! Happy?? You got all the foooood !!!!': 'Hey Hey Hey, what are you doing?? trying to escape???'}
                    </div>
                    <div className = {newClass}>
                    </div>            
                    <div className="footer"> 
                        <button onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}