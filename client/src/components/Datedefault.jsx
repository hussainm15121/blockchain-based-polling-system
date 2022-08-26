import react from 'react';

class Datedefault extends react.Component {
    
    constructor() {
        super()
        this.state={
            date1: new Date().toISOString().slice(0,10),
            datenow: new Date().toISOString().slice(0,10)
        }
    }
    selDate=(e)=>
    {
        this.setState({date1:e.target.value})
    }
    render()
    {
        return (
            <div>
                <p> Select End Date </p>
                <input type='date' value={this.state.date1} onChange={this.selDate}/>
                <p>{this.state.date1}</p> 
                <p>Date: {this.state.datenow}</p>
                
            </div>
        )
    }
}

export default Datedefault;