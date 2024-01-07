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

import { CAT_TITLE } from '@/Global_reference/variables';

import { PlusIcon } from '@/Global_reference/assets/PlusIcon.jsx';
import { useEffect, useState } from 'react';
import common from '@/Api_Call/common';
import admin from '@/Api_Call/admin';
import { useNavigate } from 'react-router-dom';
export default function AddItemModal({ cat }) {
  const nav = useNavigate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState('Tên sản phẩm');
  const [price, setPrice] = useState('29.99');
  const [quantity, setQuantity] = useState(10);
  const [brand, setBrand] = useState('Tên thương hiệu');
  const [category, setCategory] = useState(CAT_TITLE[cat]);
  const [ingredients, setIngredients] = useState('Các nguyên liệu');
  const [product_information, setProduct_information] =
    useState('Thông tin sản phẩm');
  const [use_information, setUse_information] = useState(
    'Cách sử dụng sản phẩm',
  );
  const [Barcode, setBarCode] = useState('Mã barcode');
  const [Country, setCountry] = useState('Việt Nam');
  const [ProductionPlaces, setProductionPlaces] = useState('Mỹ');
  const [Skin, setSkin] = useState('Bình thường');
  const [Sex, setSex] = useState('Nam');
  const [Type, setType] = useState('Bình thường');
  const [brands, setBrands] = useState([]);
  const [image_urls, setImage_urls] = useState(
    'https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-205100137-1695896128_img_800x800_eb97c5_fit_center.png, https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-205100137-1695896128_img_800x800_eb97c5_fit_center.png, https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-205100137-1695896128_img_800x800_eb97c5_fit_center.png',
  );
  useEffect(() => {
    common.getBrand().then((res) => setBrands(res.data.brands ?? []));
  }, []);

  const handleSubmit = () => {
    const payload = {
      name: name,
      image_urls: image_urls,
      price: price,
      brand: brand,
      category: cat,
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
      .addItem(payload)
      .then(() => {
        window.alert('Thêm sản phẩm thành công!');
        nav(0);
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  return (
    <>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        Thêm sản phẩm
      </Button>
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
                Thêm sản phẩm
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
                  {brands.map((key) => (
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
                  Thêm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
