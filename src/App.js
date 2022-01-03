import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.min.css";
import "./App.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Description from "./Description";
import ModesButtons from "./ModesButtons";
import { Template3Card, Template5Card, Template10Card } from "./cardTemplates";

/*

* Main container for the tarot reader app

* renders templates, buttons, and descriptions

TODO clean up templates and fix button states


*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCards: false,
      showDescription: false,
      cards: [],
      template: "3_temp",
      cardSelection: [],
    };
  }

  // random number generator for orientaton of cards
  orientation = (qty) => {
    let x = 0;
    let numbers = [];
    let cardSelection = [];

    while (x < qty) {
      let rand = Math.floor(Math.random() * 2);
      let randCard = Math.floor(Math.random() * this.state.cards.length);

      numbers.push(rand);

      cardSelection.push(this.state.cards[randCard]);

      console.log("Card Selected: " + randCard);
      x++;
    }
    this.setState({ cardSelection: cardSelection });
    return { numbers: numbers, cardSelection: cardSelection }; // returns an array of 1 and 0's
  };

  toggleCards(on) {
    this.setState({
      showCards: on,
    });
  }
  toggleDescription(on) {
    this.setState({ showDescription: on });
  }
  setTemplate(templ) {
    // set template from buttons
    this.setState({
      template: templ,
    });
    // default template values
    const templates = {
      3: { name: "3_temp", reversed: [], qty: 3 },
      5: { name: "5_temp", reversed: [], qty: 5 },
      10: { name: "10_temp", reversed: [], qty: 10 },
    };

    for (let key in templates) {
      if (templates[key].name == templ) {
        templates[key].reversed.push(this.orientation(templates[key].qty));
      }
    }
    // Templates is updated with the current cards pushed into the reversed array

    const processReverse = (card, num) => {
      card.isReversed = num;
    };
    /*
     *loops over templates
     */

    let i = 0;
    for (let x in templates) {
      if (templates[x].name == templ) {
        templates[x].reversed[0].cardSelection.map((card) => {
          processReverse(card, templates[x].reversed[0].numbers[i]);
          i++;
        });
      }
    }
    console.log(this.state.cards);
  }

  componentDidMount() {
    const getCards = async () => {
      const notesSnapshot = await getDocs(collection(db, "MajorArcana"));
      const cards = notesSnapshot.docs.map((doc) => doc.data());
      this.setState({ cards: cards });
      return cards;
    };
    getCards();
  }

  render() {
    const handleTemplates = (temp) => {
      switch (temp) {
        case "3_temp":
          console.log("temp 3 called");
          return (
            <Template3Card
              cardSelection={this.state.cardSelection}
              showCards={this.state.showCards}
            />
          );
        case "5_temp":
          console.log("temp 5 called");
          return (
            <Template5Card
              cardSelection={this.state.cardSelection}
              showCards={this.state.showCards}
            />
          );
        case "10_temp":
          console.log("temp 10 called");
          return (
            <Template10Card
              cardSelection={this.state.cardSelection}
              showCards={this.state.showCards}
            />
          );
      }
    };

    return (
      <div className="App">
        <header className="App-header">The Golden Tarot Card Reader</header>
        {/* Cards Templates */}
        {handleTemplates(this.state.template)}

        {/* Buttons and dropdown menus for modes */}
        <ModesButtons
          showCards={this.toggleCards.bind(this)}
          template={this.setTemplate.bind(this)}
        />

        {/* Description of the cards */}
        {/* <Description /> */}
      </div>
    );
  }
}

export default App;
