import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
// import { MailIcon } from './MailIcon.jsx';
// import { LockIcon } from './LockIcon.jsx';
import { PlusIcon } from '@/Global_reference/assets/PlusIcon.jsx';
export default function AddItemModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        Thêm sản phẩm
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Thêm sản phẩm
              </ModalHeader>
              <ModalBody>
                <Input autoFocus label='Tên sản phẩm' variant='bordered' />
                <Input label='Giá' variant='bordered' />
                <Input label='Số lượng' type='number' variant='bordered' />
                <Input label='Tên sản phẩm' variant='bordered' />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Đóng
                </Button>
                <Button color='primary' onPress={onClose}>
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
