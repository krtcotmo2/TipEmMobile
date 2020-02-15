# [Tip 'em]
![alt text](https://img.shields.io/badge/uses-React_Native-blue.svg)  ![alt text](https://img.shields.io/badge/uses-Materialize-blue.svg) ![alt text](https://img.shields.io/badge/uses-JavaScript-blue.svg)
 ![alt text](https://img.shields.io/badge/uses-React_Rangeslider-blue.svg) ![alt text](https://img.shields.io/badge/uses-Android_Store-blue.svg) 

### Problem
[<img src='https://github.com/krtcotmo2/Tips/blob/master/public/images/frontPage.png' align="right"/>](https://tip-em.herokuapp.com/)

Math is not a strong subject for most people and calculating a tip can be challenging especially if there are more than one party involved? While most people aren’t going to try and short change you it is possible that the person paying out the bill may get stuck with unexpected cost because someone did not include taxes or a drink. This application allows you to accurately calculate the total bill for one person, multiple people and even itemize the bill. Ideally this would be a mobile application. It makes more sense to have it on the device opposed to relying on a network connection.

### How I built it 
Since this is strictly a JavaScript driven application, I did not need to utilize a backend service. Node was used just to set up the React Native structure. Materialize is used for components and styling. I also used the npm package React-Rangeslider to add additional styling into the range slider. Even with React-Rangeslider, I sill went in and changed the css so that the marker on the slider took on the appearance of a gold coin that appears throughout the design.

#### React Native
Front end library to allow for component development and handle data binding and events.

#### Materialize 
CSS library for quicker and more consistent styling of the UI.

#### JavaScript 
Standard ES6 JavaScript to drive the calculations of the tool.

# The Application
#### Settings page - Individual Page in src directory
[<img src='https://github.com/krtcotmo2/Tips/blob/master/public/images/evenSt.png' align="right"/>](https://tip-em.herokuapp.com/)
Accessed from the help modal, this page allows the user to store some default values for the default tip amount, whether taxes should be included and how many people you commonly split the bill with in local storage.

There are three modes to this application:
- Total Sum
- Even Steven
- Itemize

Each mode can be accessed by clicking on the buttons of the Home Page (an individual Page in src directory)

In all three modes the user has the option of tipping on the total or the total without the taxes. Clicking on the Include Taxes switch will determine if the tip includes the taxes. The later option requires that the tax total be entered into the field. If the user will tip on the total including tax, then the tax amount is not required.

#### Total Sum - Individual Page in src directory
Use this mode for when you are not looking to split the bill at all. You simply enter in the total amount of the bill, the total amount of taxes for the bill and then slide the tip slider to the desired percentage. Below the slider, the total amount of the tip and the total amount due is displayed. 

#### Even Steven - Individual Page in src directory
This mode splits the bill into even portions regardless if you ordered the lobster or ordered the side salad. Slide the Number in Party slider to the correct number, up to 12 people, enter in the total amount of the bill, the total amount of taxes for the bill and then slide the tip slider to the desired percentage. Below the slider, the total amount of the tip and the total amount due is displayed. 

#### Itemize - Individual Page in src directory
[<img src='https://github.com/krtcotmo2/Tips/blob/master/public/images/prefrences.png' align="right"/>](https://github.com/krtcotmo2/Tips/blob/master/public/images/evenSt.png)
This is a tricky mode just because of the possibilities in the bill. The total amount and taxes are needed in order to get an accurate tax percentage even if the bill does not include the taxes before the tip. After the total and taxes are entered the user slides the tip percent to the desired amount and enters the dollar value of the first item for an individual in the item price field. If the item was shared, in the insatnce of an appetizer, the amount can be split evenly by using the slider just above the item price. Once the item price is enetered the user clicks on the Add Item button. This will start a subtotal of that individual's bill and shows you how much of the original bill still remains. Continue to enter in the remaining items for that person by repeating the steps.

When you have finished the total for that person (and giving them the total) the user can click on the Clear button to reset the subtotal back to zero. This does not reset the amount remaining on the bill. Start adding the totals for the next individual using the same steps. Keep in mind you will still need to add the splitting of the appetizers if the individual is responsible for that part of the bill.

The Reset button clears out the individual sub total and also set the remaining balance back to the total in the event the user wants to re-do the calculations.

# The Files
The scr folder holds the root folders for the React app. The components folder holds the components that make up the modal window and the top navigation bar. The pages holder has specific separate pages. The home page houses the three buttons to propel the user into the various modes. Each mode is represented by one page. 
