import { Link } from 'react-router-dom';
import './Card.css';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
function CardComponent({ itemName, imgURL, price, id }) {
  // const navigate = useNavigate();
  // navigate(generatePath('/products/:id', { id }));
  return (
    // <Link to='/item' className='inline-block'>
    <Link to={`/item/${id}`} className='inline-block'>
      <Card
        shadow='sm'
        onPress={() => console.log('item pressed')}
        className='my-4 max-w-[240px]'
      >
        <CardBody className='overflow-visible p-0'>
          <Image
            shadow='sm'
            radius='lg'
            width='100%'
            alt={itemName}
            className='w-full object-fit h-[200px]'
            src={imgURL}
          />
        </CardBody>
        <CardFooter className='text-small justify-between'>
          <div className=''>
            <b>{itemName}</b>
          </div>
          <p className='ml-2 text-default-500'>{price} vnd</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default CardComponent;

// const products = [
//   {
//     id: "1",
//     name: "Product 1"
//   },
//   {
//     id: "2",
//     name: "Product 2"
//   },
//   {
//     id: "3",
//     name: "Product 3"
//   }
// ];

// const Products = () => {
//   const { id } = useParams();

//   console.log(id);
//   return (
//     <div>
//       <p>Lorem Ipsum</p>
//       <p>Id: {id}</p>
//     </div>
//   );
// };

// const Home = () => {
//   const [id, setId] = useState();

//   const handleProceed = (e) => {
//     id && navigate(generatePath("/products/:id", { id }));
//   };

//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div>
//         {products.map((product, i) => (
//           <button
//             key={i}
//             onClick={(e) => {
//               setId(product.id);
//             }}
//           >
//             {product.name}
//           </button>
//         ))}
//       </div>
//       <button onClick={handleProceed} style={{ width: "250px" }}>
//         Proceed
//       </button>
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/products/:id" element={<Products />} />
//           <Route path="/" element={<Home />} />
//         </Switch>
//       </Router>
//     </div>
//   );
// }
