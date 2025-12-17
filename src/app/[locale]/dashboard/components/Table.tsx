'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HiDotsVertical } from 'react-icons/hi';
import { CreateModal } from '../../../../components/modal/Createmodal';
import { DeleteModal } from './DeleteModal';
import { UpdateModal } from './UpdateModal';
import { fetchAllUsers } from '@/auth/api/User/page';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
    createdAt: '2023-01-01',
    dueDate: '2023-01-15',
    item: 'Item 1',
    size: 10,
    name: 'Item 1 Name',
    color: 'Red',
    sku: 'SKU001',
    quantity: 100,
    upc: 'UPC001'
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
    createdAt: '2023-02-01',
    dueDate: '2023-02-15',
    item: 'Item 2',
    size: 5,
    name: 'Item 2 Name',
    color: 'Blue',
    sku: 'SKU002',
    quantity: 200,
    upc: 'UPC002'
  }
];

const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  const [invoiceToUpdate, setInvoiceToUpdate] = useState<any | null>(null);

  const [tableData, setTableData] = useState(invoices);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMenuToggle = (invoiceId: string) => {
    setShowMenu(showMenu === invoiceId ? null : invoiceId);
  };

  const openDeleteModal = (invoiceId: string) => {
    setInvoiceToDelete(invoiceId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (invoiceToDelete) {
      console.log(`Deleted invoice with ID: ${invoiceToDelete}`);
    }
    setIsDeleteModalOpen(false);
    setInvoiceToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setInvoiceToDelete(null);
  };

  const openUpdateModal = (invoice: any) => {
    setInvoiceToUpdate(invoice);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateConfirm = (updatedData: any) => {
    console.log('Updated Data:', updatedData);
    setIsUpdateModalOpen(false);
    setInvoiceToUpdate(null);
  };

  useEffect(() => {
    const loadUsers = async () => {
      const token = localStorage.getItem('auth_token');
      console.log(token, 'token token token token');
      if (!token) {
        console.error('Token not found. Please login.');
        return;
      }
      try {
        setLoading(true);
        const response = await fetchAllUsers();
        console.log('API response:', response);

        const mappedData = response.map((user: any) => ({
          item: user.item ?? '—',
          size: user.size ?? '—',
          name: user.name ?? '—',
          color: user.color ?? '—',
          sku: user.sku ?? '—',
          quantity: user.quantity ?? 0,
          upc: user.upc ?? '—'
        }));

        setTableData(mappedData);
      } catch (error) {
        console.error('API error:', error);
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        !target.closest('.menu-container') &&
        !target.closest('.modal-container')
      ) {
        setShowMenu(null);
      }
    };

    if (showMenu || isModalOpen || isDeleteModalOpen || isUpdateModalOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu, isModalOpen, isDeleteModalOpen, isUpdateModalOpen]);

  return (
    <div className='table-container mx-auto p-6'>
      <div className='mb-4 flex justify-end'>
        <Button onClick={openModal} variant='secondary' size='lg'>
          Create User
        </Button>
      </div>

      {loading && (
        <div className='py-4 text-center text-sm text-gray-500'>
          Loading users...
        </div>
      )}

      <div className='max-h-[450px] overflow-x-auto rounded-lg shadow-lg'>
        <table className='min-w-full table-auto border-separate border-spacing-0'>
          <thead className='text-md bg-gray-100 font-semibold'>
            <tr>
              <th className='px-6 py-3 text-left text-gray-700'>Item</th>
              <th className='px-6 py-3 text-left text-gray-700'>Size</th>
              <th className='px-6 py-3 text-left text-gray-700'>Name</th>
              <th className='px-6 py-3 text-left text-gray-700'>Color</th>
              <th className='px-6 py-3 text-left text-gray-700'>Sku</th>
              <th className='px-6 py-3 text-right text-gray-700'>Quantity</th>
              <th className='px-6 py-3 text-center text-gray-700'>Upc</th>
              <th className='px-6 py-3 text-center text-gray-700'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((invoice) => (
              <tr key={invoice.invoice} className='border-t hover:bg-gray-50'>
                <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                  {invoice.invoice}
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {invoice.size}
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {invoice.name}
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {invoice.color}
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {invoice.sku}
                </td>
                <td className='px-6 py-4 text-right text-sm text-gray-900'>
                  {invoice.quantity}
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {invoice.upc}
                </td>
                <td className='relative px-6 py-4 text-center'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handleMenuToggle(invoice.invoice)}
                    className='border-none bg-white p-2 hover:bg-gray-100'
                  >
                    <HiDotsVertical size={20} />
                  </Button>

                  {showMenu === invoice.invoice && (
                    <div className='menu-container absolute right-0 z-10 mt-2 w-28 rounded-md border border-gray-200 bg-white shadow-lg'>
                      <ul>
                        <li
                          onClick={() => openUpdateModal(invoice)}
                          className='cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          Update
                        </li>
                        <li
                          onClick={() => openDeleteModal(invoice.invoice)}
                          className='cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {!loading && tableData.length === 0 && (
              <tr>
                <td colSpan={8} className='py-6 text-center text-gray-500'>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CreateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => console.log('Confirmed!')}
        loading={false}
        title='Create New User'
        description='Fill out the details below to create a new User.'
      />

      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleUpdateConfirm}
        loading={false}
        title='Update User'
        description='Edit the details below to update this User.'
        invoiceData={invoiceToUpdate}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        loading={false}
        title='Delete User'
        description='Are you sure you want to delete this User? This action cannot be undone.'
      />
    </div>
  );
};

export default Table;
