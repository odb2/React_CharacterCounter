import React, { Component } from 'react';

class TextEntry extends Component {
    constructor(){
        super()
        this.state = {
            CharacterCount: 0,
            CharactersDict: [],
            CharactersTopFive_keys: [],
            CharacterArray: []
        }
    }
    textchange(e) {
        var array = e.target.value.split('');
        var obj = {};

        for (var i=0; i < array.length; i++) {
            obj[array[i]] = (obj[array[i]] || 0) + 1;
        }

        //Copys the obj which contains the counts of characters
        var copy = {};
        Object.assign(copy,obj);

        var keysSorted = Object.keys(copy).sort(function(a,b){
            return copy[a]-copy[b]
        })

        var uniq = [...new Set(array)];
        var uniq2 = [...new Set(array)];
        uniq2.reverse();

        var keysSorted = uniq2.sort(function(a,b){
            return copy[a]-copy[b]
        })
        console.log(keysSorted)

        this.setState({
            CharacterCount: e.target.value.length,
            CharactersDict: obj,
            CharactersTopFive_keys: keysSorted.slice(-5),
            CharacterArray: uniq
        });
    };

    render() {
        return (
            <div id="textentry">
                <h1>Character Counter</h1>
                <p><b>Directions:</b> Enter text and then see the table of characters expand along with the total number of each character. Characters are sorted by total amount then by seniority on the table.</p>
                <textarea id="textbox" placeholder="Enter Text Here" onChange={ (e) => this.textchange(e) }></textarea>
                <p>Total Number of characters: {this.state.CharacterCount}</p>
                <table>
                    <tr>
                    <th>Character</th>
                    <th>Total Amount</th>
                    </tr>
                    {
                        this.state.CharacterArray.map( key =>
                        <tr id={key} style={{ backgroundColor: (this.state.CharactersTopFive_keys.includes(key)) ? "yellow" : "white" }}>
                            <td>{key}</td>
                            <td>{this.state.CharactersDict[key]}</td>
                        </tr>
                    )}
                </table>
            </div>
        );
    }
}
export default TextEntry;