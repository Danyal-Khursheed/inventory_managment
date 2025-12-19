'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow
} from '@/components/ui/table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { UserTableProps } from '../types/types';

const UserTable: React.FC<UserTableProps> = ({ users, onUpdate, onDelete }) => (
  <Table className='max-w-[1800px] overflow-x-auto border-2'>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Color</TableHead>
        <TableHead>SKU</TableHead>
        <TableHead>UPC</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Size</TableHead>
        <TableHead className='text-right'>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id} className='whitespace-nowrap'>
          <TableCell>{user.item}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.color}</TableCell>
          <TableCell>{user.sku}</TableCell>
          <TableCell>{user.upc}</TableCell>
          <TableCell>{user.quantity}</TableCell>
          <TableCell>{user.size}</TableCell>
          <TableCell className='flex justify-end gap-4 text-right'>
            <button onClick={() => onUpdate(user)}>
              <FaEdit />
            </button>
            <button onClick={() => onDelete(user)}>
              <FaTrash />
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default UserTable;
