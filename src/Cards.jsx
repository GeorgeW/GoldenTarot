
/*
card templates

handles flipping cards
*/

const Cards = (props) => {

    const cardBack = "./images/cardback.jpg";
    const currentCard = "./images/thefool.jpg";


    function flipCards(e, isClicked){
        isClicked = true;
        e.src = currentCard;
    }

    return(
        <div className="card-container" style={{display: props.showCards ? "" : "none"}}>
        {/* TODO make templates for modes */}
        <div onClick={(e) => flipCards(e.target)}>
            <img src={cardBack} alt="" />
        </div>
        <div onClick={(e) => flipCards(e.target)}>
            <img src={cardBack} alt="" />
        </div>
        <div onClick={(e) => flipCards(e.target)}>
            <img src={cardBack} alt="" />
        </div>
      </div>
    );
}
export default Cards;