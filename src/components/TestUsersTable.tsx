'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

async function fetchUsers() {
  const res = await fetch('/api/test-users/User');
  return res.json();
}

export default function TestUsersTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['test-users'],
    queryFn: fetchUsers
  });

  if (isLoading)
    return <p className='w-full p-4 text-center'>Loading users...</p>;
  if (error)
    return (
      <p className='w-full p-4 text-center text-red-500'>
        Error loading users!
      </p>
    );

  return (
    <div className='bg-card w-full rounded-md border p-6 shadow-sm'>
      <h2 className='mb-4 text-xl font-semibold'>Test Users (React Query)</h2>

      <div className='w-full overflow-x-auto'>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
