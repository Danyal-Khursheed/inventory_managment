'use client';

import { useState } from 'react';

interface User {
  id: number;
  companyName: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: string;
}

export default function DummyTable() {
  // Dummy data
  const [users] = useState<User[]>([
    {
      id: 1,
      companyName: 'Acme Corp',
      fullName: 'John Doe',
      email: 'john@example.com',
      countryCode: '+1',
      phoneNumber: '1234567890',
      role: 'Admin'
    },
    {
      id: 2,
      companyName: 'Beta Ltd',
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      countryCode: '+44',
      phoneNumber: '9876543210',
      role: 'User'
    },
    {
      id: 3,
      companyName: 'Gamma Inc',
      fullName: 'Bob Johnson',
      email: 'bob@example.com',
      countryCode: '+91',
      phoneNumber: '5551234567',
      role: 'User'
    }
  ]);

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full divide-y divide-gray-200 border border-gray-200 dark:divide-neutral-700 dark:border-neutral-800'>
        <thead className='bg-gray-50 dark:bg-neutral-900'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400'>
              ID
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400'>
              Company
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400'>
              Full Name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400'>
              Phone
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400'>
              Role
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900'>
          {users.map((user) => (
            <tr
              key={user.id}
              className='hover:bg-gray-100 dark:hover:bg-neutral-800'
            >
              <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100'>
                {user.id}
              </td>
              <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100'>
                {user.companyName}
              </td>
              <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100'>
                {user.fullName}
              </td>
              <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400'>
                {user.email}
              </td>
              <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100'>{`${user.countryCode} ${user.phoneNumber}`}</td>
              <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100'>
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
