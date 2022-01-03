const Template3Card = (props) => {
  const cardBack = "./images/cardback.jpg";
  const cardSelection = props.cardSelection;

  function flipCards(e, isClicked) {
    let image = e.dataset.src;
    e.isclicked = "yes";
    console.log(image);
    e.src = image;
  }

  return (
    <div
      className="card-container"
      style={{ display: props.showCards ? "" : "none" }}
    >
      {cardSelection.map((card) => (
        <div key={Math.random()} onClick={(e) => flipCards(e.target)}>
          <img
            className={card.isReversed == 1 ? "reversed" : ""}
            key={Math.random()}
            src={cardBack}
            data-src={card.img}
            isclicked="no"
          />
        </div>
      ))}
    </div>
  );
};
export { Template3Card };
