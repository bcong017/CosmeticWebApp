import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import { FaEye } from 'react-icons/fa';

import { CAT_TITLE } from '@/Global_reference/variables';

import { useEffect, useState } from 'react';
import common from '@/Api_Call/common';
import admin from '@/Api_Call/admin';
import items from '@/Api_Call/items';
import { useNavigate } from 'react-router-dom';
export default function EditItemModal({ id, cat }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentItem, setCurrentItem] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState();
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState();
  const [ingredients, setIngredients] = useState('');
  const [product_information, setProduct_information] = useState('');
  const [use_information, setUse_information] = useState('');
  const [Barcode, setBarCode] = useState('');
  const [Country, setCountry] = useState('');
  const [ProductionPlaces, setProductionPlaces] = useState('');
  const [Skin, setSkin] = useState('');
  const [Sex, setSex] = useState('');
  const [Type, setType] = useState('');
  const [brands, setBrands] = useState([]);
  const [image_urls, setImage_urls] = useState('');
  const nav = useNavigate();
  useEffect(() => {
    common.getBrand().then((res) => setBrands(res.data.brands ?? []));
    items.getItem(id).then((res) => setCurrentItem(res.data.item));
  }, []);

  useEffect(() => {
    setName(currentItem.name);
    setImage_urls(currentItem.imageURLs?.join());
    setPrice(
      currentItem.base_price ? currentItem.base_price : currentItem.price,
    );
    // setBrands(currentItem?.brand);
    setCategory(currentItem.category);
    setIngredients(currentItem.ingredients);
    setQuantity(currentItem.quantity);
    setProduct_information(currentItem.product_information);
    setUse_information(currentItem.use_information);
    setBarCode(currentItem.specifications?.Barcode);
    setCountry(currentItem.specifications?.Country);
    setProductionPlaces(currentItem.specifications?.ProductionPlaces);
    setSkin(currentItem.specifications?.Skin);
    setSex(currentItem.specifications?.Sex);
    setType(currentItem.specifications?.type);
  }, [currentItem]);
  const handleSubmit = () => {
    const payload = {
      name: name,
      image_urls: image_urls,
      price: price,
      brand: brand,
      category: category,
      ingredients: ingredients,
      quantity: quantity,
      product_information: product_information,
      use_information: use_information,
      Barcode: Barcode,
      Country: Country,
      ProductionPlaces: ProductionPlaces,
      Skin: Skin,
      Sex: Sex,
      Type: Type,
    };
    admin
      .editItem(id, payload)
      .then(() => {
        window.alert('Sửa sản phẩm thành công!');
        nav(0);
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  return (
    <>
      <div onClick={onOpen}>
        <FaEye />
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        scrollBehavior={'outside'}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Sửa sản phẩm
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label='Tên sản phẩm'
                  variant='bordered'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label='Giá (VND)'
                  variant='bordered'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                  label='Link hình ảnh'
                  variant='bordered'
                  value={image_urls}
                  onChange={(e) => setImage_urls(e.target.value)}
                />
                <Input
                  label='Số lượng'
                  type='number'
                  variant='bordered'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                  label='Hãng'
                  variant='bordered'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <RadioGroup
                  size='sm'
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brands?.map((key) => (
                    <Radio key={key} value={key}>
                      {key}
                    </Radio>
                  ))}
                </RadioGroup>
                <div>Danh mục: {CAT_TITLE[cat]}</div>
                <Input
                  label='Nguyên liệu'
                  variant='bordered'
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
                <Input
                  label='Số lượng'
                  variant='bordered'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                  label='Thông tin sản phẩm'
                  variant='bordered'
                  value={product_information}
                  onChange={(e) => setProduct_information(e.target.value)}
                />
                <Input
                  label='Cách sử dụng sản phẩm'
                  variant='bordered'
                  value={use_information}
                  onChange={(e) => setUse_information(e.target.value)}
                />
                <Input
                  label='Barcode'
                  variant='bordered'
                  value={Barcode}
                  onChange={(e) => setBarCode(e.target.value)}
                />
                <Input
                  label='Nơi xuất xứ'
                  variant='bordered'
                  value={Country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <Input
                  label='Nơi sản xuất'
                  variant='bordered'
                  value={ProductionPlaces}
                  onChange={(e) => setProductionPlaces(e.target.value)}
                />
                <Input
                  label='Loại da'
                  variant='bordered'
                  value={Skin}
                  onChange={(e) => setSkin(e.target.value)}
                />
                <Input
                  label='Giới tính'
                  variant='bordered'
                  value={Sex}
                  onChange={(e) => setSex(e.target.value)}
                />
                <Input
                  label='Loại'
                  variant='bordered'
                  value={Type}
                  onChange={(e) => setType(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color='primary'
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  Sửa sản phẩm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
