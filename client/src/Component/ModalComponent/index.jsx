import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusIcon } from '@/Global_reference/assets/PlusIcon';

/**
 *
 * @param {object} values - values for generating modal form
 */
function ModalComponent({ title, query, values, onOk }) {
  const [formValues, setFormValues] = useState(values ?? {});
  const memoFormValues = useMemo(() => values, [values]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  /** TODO: */
  const onChangeValue = (key, e) => {
    console.log(key, e);
  };

  const handleOk = (onClose) => {
    query(memoFormValues).then((response) => {
      // TODO:
      console.log('Thêm chương trình giảm giá thành công!', response.data);
      onClose();
      onOk();
    });
  };

  useEffect(() => {
    setFormValues(memoFormValues);
  }, [memoFormValues]);

  return (
    <>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        Thêm
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>

              <ModalBody>
                {/** TODO: */}
                {Object.keys(values).map((key) => (
                  <Input
                    key={key}
                    value={formValues[key].value}
                    label={formValues[key].title}
                    variant='bordered'
                    onChange={(v) => onChangeValue(key, v)}
                  />
                ))}
              </ModalBody>

              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Đóng
                </Button>
                <Button color='primary' onPress={handleOk}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

ModalComponent.propTypes = {
  values: PropTypes.object,
};

export default ModalComponent;
