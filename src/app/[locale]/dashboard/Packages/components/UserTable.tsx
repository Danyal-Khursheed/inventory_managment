// components/UserTable.tsx
'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow
} from '@/components/ui/table';
import { FaEllipsisV } from 'react-icons/fa';

interface User {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
}

interface UserTableProps {
  users: User[];
  onUpdate: (user: User) => void;
  onDelete: (user: User) => void;
  activeMenu: number | null;
  setActiveMenu: (index: number | null) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onUpdate,
  onDelete,
  activeMenu,
  setActiveMenu
}) => {
  return (
    <Table>
      <TableCaption className='bg-background sticky bottom-0'>
        A list of your recent users.
      </TableCaption>
      <TableHeader className='bg-background sticky top-0 z-10 border-b'>
        <TableRow>
          <TableHead className='w-[100px]'>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={`${user.invoice}-${index}`}>
            <TableCell className='font-medium'>{user.invoice}</TableCell>
            <TableCell>{user.paymentStatus}</TableCell>
            <TableCell>{user.paymentMethod}</TableCell>
            <TableCell className='relative text-right'>
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === index ? null : index)
                }
                className='ellipsis-btn'
              >
                <FaEllipsisV />
              </button>

              {activeMenu === index && (
                <div className='bg-background absolute right-0 z-50 mt-2 w-24 rounded border shadow'>
                  <button
                    onClick={() => onUpdate(user)}
                    className='hover:bg-muted block w-full px-3 py-2 text-left'
                  >
                    Update
                  </button>

                  <button
                    onClick={() => onDelete(user)}
                    className='hover:bg-muted block w-full px-3 py-2 text-left text-red-500'
                  >
                    Delete
                  </button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
