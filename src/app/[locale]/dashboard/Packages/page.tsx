// pages/[locale]/dashboard/Packages/page.tsx
'use client';
import { useState } from 'react';
import UserTable from './components/UserTable';
import CreateNewUserPopUp from './components/CreateNewUserPopUp';
import HeaderHero from './components/HeaderHero';
import { DeleteUserModal } from './components/DeleteUserModal';
import { UpdateUserModal } from './components/UpdateUserModal';

const users = [
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
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal'
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal'
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal'
  }
];

const Page = () => {
  const [createUserPopup, setCreateUserPopup] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [updateUserModal, setUpdateUSerModal] = useState(false);

  const handleUpdate = (user: any) => {
    setUpdateUSerModal(true);
    console.log('Update:', user.invoice);
  };

  const handleDelete = (user: any) => {
    setDeleteUserModal(true);
    console.log('Delete:', user.invoice);
  };

  return (
    <div className='w-full max-w-[1600px] p-4'>
      <HeaderHero
        componentName='User Management'
        buttonName='Create New User'
        handleButton={() => setCreateUserPopup(true)}
      />

      <div className='overflow-hidden rounded-lg border'>
        <div className='max-h-[calc(90vh-40px)] overflow-y-auto px-4'>
          <UserTable
            users={users}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <CreateNewUserPopUp
        open={createUserPopup}
        onOpenChange={setCreateUserPopup}
      />
      <DeleteUserModal
        open={deleteUserModal}
        onOpenChange={setDeleteUserModal}
        onConfirm={() => {}}
      />
      <UpdateUserModal
        open={updateUserModal}
        onOpenChange={setUpdateUSerModal}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default Page;
