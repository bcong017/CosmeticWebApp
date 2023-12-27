import { Link } from 'react-router-dom';
import './Card.css';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
function CardComponent({ itemName, imgURL, price, id }) {
  return (
    <Link to={`/item/${id}`} className='inline-block'>
      <Card shadow='sm' className='my-4 max-w-[250px]'>
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
        <CardFooter className='gap-3 flex-col'>
          <div className=''>
            <b>{itemName}</b>
          </div>
          <div className='flex gap-3'>
            <div className='text-xs flex justify-center items-center text-default-500 line-through '>
              {' '}
              {price} VND
            </div>
            <div className='text-default-500 text-base'> {price} VND</div>
            <div className='text-rose-700'>-30%</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default CardComponent;
