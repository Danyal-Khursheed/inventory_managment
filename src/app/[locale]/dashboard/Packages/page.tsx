'use client';

import { useState } from 'react';
import UserTable from './components/UserTable';
import type { User } from '@/services/users.service';
import CreateNewUserPopUp from './components/CreateNewUserPopUp';
import HeaderHero from './components/HeaderHero';
import { DeleteUserModal } from './components/DeleteUserModal';
import { UpdateUserModal } from './components/UpdateUserModal';
import { useGetAllUsers } from './hook';
import { useDeleteUser } from './hook/useDeleteUser';

const Page = () => {
  const [createUserPopup, setCreateUserPopup] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isError } = useGetAllUsers(1, 10);
  const deleteMutation = useDeleteUser();

  const users = data?.data ?? [];

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setUpdateUserModal(true);
  };

  const handleDelete = (user: User) => {
    console.log('Selected user for delete:', user);
    console.log('Selected ID:', user.id);

    setSelectedUser(user);
    setDeleteUserModal(true);
  };

  const confirmDelete = () => {
    if (!selectedUser?.id) return;

    console.log('Confirm delete ID:', selectedUser.id);

    deleteMutation.mutate(selectedUser.id, {
      onSuccess: () => {
        setDeleteUserModal(false);
        setSelectedUser(null);
      }
    });
  };

  if (isError) {
    return <p className='p-4 text-red-500'>Failed to load users</p>;
  }

  return (
    <div className='w-full max-w-[1600px] p-4'>
      <HeaderHero
        componentName='User Management'
        buttonName='Create New User'
        handleButton={() => setCreateUserPopup(true)}
      />

      <UserTable
        users={users}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <CreateNewUserPopUp
        open={createUserPopup}
        onOpenChange={setCreateUserPopup}
      />

      <DeleteUserModal
        open={deleteUserModal}
        onOpenChange={setDeleteUserModal}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />

      <UpdateUserModal
        open={updateUserModal}
        onOpenChange={setUpdateUserModal}
        user={selectedUser}
      />
    </div>
  );
};

export default Page;
