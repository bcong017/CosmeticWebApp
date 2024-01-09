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

import { ChevronDownIcon } from '@/Global_reference/assets/ChevronDownIcon';
import { capitalize } from '@/Global_reference/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import admin, { SALE_COLUMNS } from '@/Api_Call/admin';
import AddItemModal from './ui/AddItemModal';
import saleevents from '@/Api_Call/saleevents';
import { DeleteIcon } from '@/Global_reference/assets/DeleteIcon';
import { useNavigate } from 'react-router-dom';
import EditItemModal from './ui/EditItemModal';
import { CAT_TITLE } from '@/Global_reference/variables';

const INITIAL_SALE_COLUMNS = [
  'id',
  'event_name',
  'discount_percentage',
  'start_date',
  'end_date',
  'brand',
  'category',
  'actions',
];

function DiscountTab() {
  const nav = useNavigate();
  const [eventItems, setEventItems] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_SALE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'amount',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);

  const pages = Math.ceil([...eventItems].length / rowsPerPage);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return SALE_COLUMNS;

    return SALE_COLUMNS.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return [...eventItems].slice(start, end);
  }, [page, rowsPerPage, eventItems]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const handleDate = (date) => {
    const res = date?.split('T');

    return res ? res[0].split('-').reverse().join('-') : null;
  };
  const handleDelete = (id) => {
    if (confirm('Bạn có muốn xóa sự kiện này?')) {
      saleevents
        .removeEvent(id)
        .then(
          admin
            .getEvents()
            .then((response) => {
              setEventItems(response.data.saleEvents ?? []);
              nav(0);
            })
            .catch((e) => {
              console.log(e);
            }),
        )
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const renderCell = useCallback((event, columnKey, id) => {
    const cellValue = event[columnKey];

    switch (columnKey) {
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Xem/Sửa sản phẩm' color='success'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EditItemModal onOk={onOkAddEvent} id={id} />
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
      case 'start_date':
      case 'end_date':
        return <div>{handleDate(cellValue)} </div>;
      case 'category':
        return <div>{CAT_TITLE[cellValue]}</div>;
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onOkAddEvent = () => {
    admin
      .getEvents()
      .then((response) => {
        setEventItems(response.data.saleEvents ?? []);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    admin
      .getEvents()
      .then((response) => {
        setEventItems(response.data.saleEvents ?? []);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between '>
          <AddItemModal onOk={onOkAddEvent} />
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
              {SALE_COLUMNS.map((column) => (
                <DropdownItem key={column?.uid} className='capitalize'>
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Tổng {eventItems.length} chương trình giảm giá
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
  }, [visibleColumns, onRowsPerPageChange, eventItems]);

  const BottomContent = () => {
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
  };

  return (
    <div className='m-5'>
      <Table
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
        bottomContent={<BottomContent />}
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
              key={column?.uid}
              align={column?.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'Không có sản phẩm'} items={sortedItems}>
          {(item) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey, item?.id)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>{' '}
      </Table>
    </div>
  );
}

export default DiscountTab;
