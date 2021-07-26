# React_CharacterCounter

## Table of Contents
* Project
* Installation
* How it Works
* Edge Cases
* Improvements
* Code Review/Documentation


## Project
Build a React web-app to let users count characters with
the following limitations:
* The web-app has a text area.
* Text of any length may be entered in the text area.
The web app should count and display the number
of times each character appeared in the text
* The character and their respective counts should be
displayed in the order that the characters appeared in the original text.
* Web app should also highlight the 5 most frequent
characters in the text.
* (Bonus) Use Tailwind CSS for any and all styling.

## Installation

* Built using ReactJS
* The project is deployed and live through Heroku located at this <a target="_blank" href="https://react-charactercounter.herokuapp.com/">Link to Heroku App</a>
* Or download through git clone (then run "npm install" and "npm start" and go to localhost:3000 to view app)

## How It Works

1. Open localhost:3000 or visit <a target="_blank" href="https://react-charactercounter.herokuapp.com/">Link to Heroku App</a>

<div align="center"><img width="600" src="frontpage.png" /></div>

2. Follow the directions by entering your text into the textbox

3. Observe that a table is generated as you type that displays the "Character" and "Total Amount" for each character.

4. The top 5 most frequent characters are highlighted yellow the rest are not highlighted.

5. Thats how my project works!

## Edge Cases

* What happens when there is a tie which character gets highlighted?

In the case of a tie the character higher up on the table will be highlighted.

* Lowercase and Uppercase letters?
      
In the case of lowercase and uppercase letters I just converted the input string all to lowercase. However this can always be removed to realize uppercase and lowercase as different characters.
      
* Whitespace or the enter key?

In the case of a space or enter key I removed them from the array so they do not count as a character.

## Ways to Improve

* Fix the design in react making it more appealing to the eyes
* Format reactjs code better by adding more components

## Review Code/Documentation      
        
### Function which runs when text is entered into textbox

<details open>
<summary>Click to see script! (description of purpose below)</summary>
   
```js           
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
      CharacterCount: e.target.value.length,
      CharactersDict: obj,
      CharactersTopFive_keys: keysSorted.slice(-5),
      CharacterArray: uniq
  });
};
```

</details>


Description: 
   
-> Collects the text entered into the textarea.
   
-> Manipulates the text and creates object with individual characters and the count of each character.
   
-> Feeds the new obj to render the JSX
<br />
<br />
<br />
   
   
### Table Generation JSX
   
<details open>
<summary>Click to see how table is generated! (description of purpose below)</summary>
   
```js           
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
```

</details>


Description: 
   
-> Runs through CharacterArray state and creates rows with character and character count while checking if it should be highlighted
