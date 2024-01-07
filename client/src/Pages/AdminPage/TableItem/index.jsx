import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tooltip,
} from '@nextui-org/react';
import EditItemModal from './EditItemModal';
import { DeleteIcon } from '@/Global_reference/assets/DeleteIcon';
import { ChevronDownIcon } from '@/Global_reference/assets/ChevronDownIcon';
import { columns } from './data';
import { capitalize } from '../../../Global_reference/utils';
import AddItemModal from './AddItemModal';
import categories from '@/Api_Call/categories';
import admin from '@/Api_Call/admin';
import { useNavigate } from 'react-router-dom';

const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'iid',
  'name',
  'price',
  'amount',
  'actions',
];

export default function TableItem({ cat }) {
  const [itemList, setItemList] = useState([]);
  const nav = useNavigate();
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  useEffect(() => {
    categories.getAllItems(`${cat}`).then((res) => {
      const newList = [];
      Array.prototype.forEach.call(res?.data.resultedItems, (c, index) => {
        newList.push({
          id: index + 1,
          iid: c.id,
          name: c.name,
          price: `${c.price} VND`,
          amount: c.quantity,
        });
      });

      setItemList(newList);
    });
  }, []);

  const handleDelete = (id) => {
    if (confirm('Xóa sản phẩm này?')) {
      admin
        .deleteItem(id)
        .then(() => {
          alert('Đã xóa sản phẩm thành công!');
          nav(0);
        })
        .catch((err) => console.log(err));
    }
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'id',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const pages = Math.ceil([...itemList].length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return [...itemList].slice(start, end);
  }, [page, rowsPerPage, itemList]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((item, columnKey, id) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case 'price':
        return item.base_price ? (
          <div>{item.base_price}</div>
        ) : (
          <div>{item.price}</div>
        );
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Xem/Sửa sản phẩm' color='success'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EditItemModal id={id} cat={cat} />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Xóa sản phẩm'>
              <span
                className='text-lg text-danger cursor-pointer active:opacity-50'
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between '>
          <AddItemModal cat={cat} />
          <Dropdown>
            <DropdownTrigger className='hidden sm:flex'>
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                Cột cần hiển thị
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode='multiple'
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className='capitalize'>
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className='flex justify-between items-center'>
          {/* {itemList?.length != 0 && (
       
          )} */}

          <span className='text-default-400 text-small'>
            Tổng {itemList?.length} sản phẩm
          </span>
          <label className='flex items-center text-default-400 text-small'>
            Số hàng mỗi trang
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [visibleColumns, onRowsPerPageChange]);

  const bottomContent = React.useMemo(() => {
    return (
      pages > 0 && (
        <div className='py-2 px-2 flex justify-center items-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      )
    );
  });

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'max-h-[382px]',
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'Không có sản phẩm'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey, item.iid)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
