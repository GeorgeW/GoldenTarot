import { eyeEvil } from "fontawesome";
import React from "react";

/* 

Handles buttons and dropdowns

*/

class ModesButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOn: true,
      showCards: true,
      setButton: false,
      template: "",
      mode: "Select Mode",
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.showCardsToggle = this.showCardsToggle.bind(this);
    this.switchTemplates = this.switchTemplates.bind(this);
  }

  // Handle dropdown toggle
  handleToggle() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  showCardsToggle() {
    this.props.showCards(this.state.showCards);
    this.setState({ setButton: true });
  }
  // -------------------------------------Handle on select for drop down---------------------------------------------//

  switchTemplates(element) {
    this.props.template(element.target.id);
    const currentElement = element.target;

    if (element.target.className.includes("is-active")) {
      console.log("not active");
    } else {
      element.target.className += " is-active";
    }

    let parents = [...element.target.parentNode.childNodes];
    parents.forEach((element) => {
      if (element != currentElement) {
        element.className = "dropdown-item";
      }
    });
    let main = document.getElementById("main-drop");
    main.className = "dropdown";

    this.setState({ mode: currentElement.name });
  }

  render() {
    return (
      <div className="ModesButtons">
        <button
          id="begin"
          className={
            this.state.setButton ? "button is-static" : " button is-primary"
          }
          onClick={this.showCardsToggle.bind(this)}
        >
          Deal Cards
        </button>
        <div
          className={this.state.isToggleOn ? "dropdown is-active" : "dropdown"}
          id="main-drop"
        >
          {/* --------------------------dropdown------------------------------------ */}
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={this.handleToggle}
            >
              <span>{this.state.mode}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a
                href="#3"
                id="3_temp"
                name="Three Card Reading"
                className="dropdown-item"
                onClick={this.switchTemplates}
              >
                Three Card Reading
              </a>
              <a
                href="#2"
                id="2_temp"
                name="Question and Answer"
                className="dropdown-item"
                onClick={this.switchTemplates}
              >
                Question and Answer
              </a>
              <a
                href="#7"
                id="7_temp"
                name="The Week Ahead"
                className="dropdown-item"
                onClick={this.switchTemplates}
              >
                The Week Ahead
              </a>
              <a
                href="#5"
                id="5_temp"
                name="The Golden Star"
                className="dropdown-item"
                onClick={this.switchTemplates}
              >
                The Golden Star
              </a>
              <a
                href="#10"
                id="10_temp"
                name="The Celtic Cross"
                className="dropdown-item"
                onClick={this.switchTemplates}
              >
                The Celtic Cross
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModesButtons;
