import React from 'react';
// import './App.css';
const list = [ {
    id: 1,
    text: "first"
},
{
    id: 2,
    text: "second"
},
{
    id: 3,
    text: "aaaaaaaaaaaaaa sdadasd"
},
{
    id: 4,
    text: "dsdsds dsdsadd "
}];

var style = {
    fontSize: '0.6em',
    color: 'black'
};


class InformLabel extends React.Component {
    constructor (props) {
        super(props);
        this.state = { informList: [] 
        };
    }
componentWillMount() {
    this.setState({informList: list});
}

renderUsers() {
    if (this.state.informList.length >0) {
        return(
            <ol>
                {this.state.informList.map(a=> <li key={a.id}>{a.text}</li>)}
            </ol>
        );
    }
    else return <p></p>
};

render(){
    return(
        <div className="informLabel" style={style}>
            {this.renderUsers()}
        </div>
    );

}
}

export default InformLabel;