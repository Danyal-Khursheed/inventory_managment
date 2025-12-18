'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { useEffect, useState } from 'react';
import HeaderHero from '../components/HeaderHero';

import CreateNewUserPopUp from './components/CreateNewUserPopUp';
import { CreateUserModal } from './components/CreateUserModal';
import { UpdateUserModal } from './components/UpdateUserModal';
import { DeleteUserModal } from './components/DeleteUserModal';
import type { UpdateUserFormData } from './components/UpdateUserModal';
import { useGetAllUsers } from './hook';
import { getToken } from '@/auth/utils/auth-helpers';
import { Button } from '../components/button';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal'
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer'
  },
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal'
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer'
  },
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal'
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer'
  },
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal'
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer'
  }
];

const Page = () => {
  const [page] = useState(1);
  const [pageSize] = useState(10);

  const {
    data: usersResponse,
    isLoading,
    isError,
    error
  } = useGetAllUsers(page, pageSize);

  const [createUserPopup, setCreateUserPopup] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [invoiceToUpdate, setInvoiceToUpdate] =
    useState<UpdateUserFormData | null>(null);

  const handleCreateConfirm = (data: any) => {
    console.log('Create:', data);
    setIsModalOpen(false);
  };

  const handleUpdateConfirm = (data: UpdateUserFormData) => {
    console.log('Update:', data);
    setIsUpdateModalOpen(false);
    setInvoiceToUpdate(null);
  };

  const handleDeleteConfirm = () => {
    console.log('Delete:', invoiceToUpdate?.id);
    setIsDeleteModalOpen(false);
    setInvoiceToUpdate(null);
  };

  useEffect(() => {
    const token = getToken();
    console.log('Bearer Token:', token);

    if (usersResponse) {
      console.log('Users API Response:', usersResponse);
    }
    if (isError) {
      console.error('Error fetching users:', error);
    }
  }, [usersResponse, isError, error]);

  return (
    <div className='mx-2 w-[95%] max-w-[1400px]'>
      <HeaderHero
        componentName='User Management'
        buttonName='Create New User'
        handleButton={() => setIsModalOpen(true)}
      />
      <Button onClick={() => setCreateUserModal(true)}>open modal</Button>
      <div className='overflow-hidden rounded-lg border'>
        <div className='max-h-[calc(80vh-90px)] overflow-x-auto overflow-y-auto px-4'>
          <Table>
            <TableHeader className='bg-background sticky top-0 z-10 border-b text-lg font-medium'>
              <TableRow>
                <TableHead className='w-[100px]'>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow key={`${invoice.invoice}-${index}`}>
                  <TableCell className='font-medium'>
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className='text-right'>
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CreateNewUserPopUp
        open={createUserPopup}
        onOpenChange={setCreateUserPopup}
      />

      <CreateUserModal
        open={createUserModal}
        onOpenChange={setCreateUserModal}
        onSubmit={handleCreateConfirm}
      />
      <UpdateUserModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        initialData={invoiceToUpdate}
        onSubmit={handleUpdateConfirm}
      />

      <DeleteUserModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Page;
