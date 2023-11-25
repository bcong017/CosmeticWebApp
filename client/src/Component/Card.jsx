import "../css/Card.css"
function Card(props) {
  return (
    <a href="#">
    <div className="card-body">
      <div className="item-name">{props.itemName}</div>
      <img className="image-item" src={props.imgURL} alt="img-8" />
      <div className="item-price">Giá: {props.price}</div>
    </div>
    </a>
  );
}

export default Card;
