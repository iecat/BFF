import React from 'react';
export default class  Modal extends React.Component
{
    constructor(props)
    {
        super(props);


    }  

    setRef(ref) {
        this._headerName = ref;

        this.timer = setInterval(this.nextSlide, 5000);
    }

    render() {

        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop" >
                <div className="modal" >
                    <label>header name</label>
                    <input type="text" id="test" ref={input =>this._headerName = input} onChange={this.props.handleOnChange} />
            
                    <div className="footer">
                    <button onClick={this.props.onSave}>
                            Save
                    </button>                   

                    <button onClick={this.props.onClose}>
                        Close
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}