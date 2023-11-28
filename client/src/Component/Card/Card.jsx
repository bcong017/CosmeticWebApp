import "./Card.css"
import { Link } from "react-router-dom";
function Card(props) {
  return (
    <Link to="/item">
    <div className="card-body">
      <div className="item-name">{props.itemName}</div>
      <img className="image-item" src={props.imgURL} alt="img-8" />
      <div className="item-price">Giá: {props.price}</div>
    </div>
    </Link>
  );
}

export default Card;
