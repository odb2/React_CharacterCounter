import React, { Component } from 'react';

class TextEntry extends Component {
    constructor(){
        super()
        this.state = {
            CharacterCount: 0,
            CharactersDict: [],
            CharactersTopFive_keys: []
        }
    }
    textchange(e) {
        var array = e.target.value.split('');
        var obj = {};
        for (var i=0; i < array.length; i++) {
          obj[array[i]] = (obj[array[i]] || 0) +1 ;
        }

        //Copys the obj which contains the counts of characters
        var copy = {};
        Object.assign(copy,obj);

        //Sorts the copy from fewest counts to largest counts
        const sortable = Object.entries(copy)
        .sort(([,a],[,b]) => a-b)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

        const top_five = Object.fromEntries(Object.entries(sortable).slice(-5));
        
        const top_five_keys = Object.keys(top_five)
        
        this.setState({
            CharacterCount: e.target.value.length,
            CharactersDict: obj,
            CharactersTopFive_keys: top_five_keys
        });
    };

    render() {
        return (
            <div>
                <textarea placeholder="Enter Text Here" onChange={ (e) => this.textchange(e) }></textarea>
                <p>Number of characters: {this.state.CharacterCount}</p>
                <ul>
                    {
                        Object.entries(this.state.CharactersDict).map( ([key,value]) =>
                        <li id={key} style={{ backgroundColor: (this.state.CharactersTopFive_keys.includes(key)) ? "yellow" : "white" }}>
                            {key}, {value}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
export default TextEntry;