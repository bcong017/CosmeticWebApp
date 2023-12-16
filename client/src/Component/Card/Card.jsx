import { Link } from 'react-router-dom';
import './Card.css';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
function CardComponent({ itemName, imgURL, price }) {
  return (
    <Link to='/item' className='inline-block'>
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
            className='w-full object-cover h-[200px]'
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
