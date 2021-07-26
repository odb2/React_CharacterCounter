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
    //Function which runs when text is changed in textbox
    textchange(e) {
        //Converts input text to an array filled with individual characters
        //Converts input text to lowercase
        var input_text = e.target.value.toLowerCase();
        var array = input_text.split('');
        
        //Removes whitespace elements in array
        array = array.filter(function(str) {
            return /\S/.test(str);
        });

        //Creates object which contains the individual characters and 
        //the amount of times they appear
        var obj = {};
        for (var i=0; i < array.length; i++) {
            obj[array[i]] = (obj[array[i]] || 0) + 1;
        }

        //manipulates the input string to shrink to only unique characters
        //the reason for this was because feeding obj to render 
        //always made them in the wrong order
        var uniq = [...new Set(array)];
        var uniq2 = [...new Set(array)];
        uniq2.reverse();

        //Copys the obj which contains the counts of characters
        var copy = {};
        Object.assign(copy,obj);
        //Sorts the characters from smallest to largest
        var keysSorted = uniq2.sort(function(a,b){
            return copy[a]-copy[b]
        })

        this.setState({
            CharacterCount: array.length,
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