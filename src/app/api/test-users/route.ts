import { NextResponse } from 'next/server';

export async function GET() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Sarah Miller', email: 'sarah@example.com' },
    { id: 3, name: 'David Kim', email: 'david@example.com' },
    { id: 4, name: 'John Doe', email: 'john@example.com' },
    { id: 5, name: 'Sarah Miller', email: 'sarah@example.com' },
    { id: 6, name: 'David Kim', email: 'david@example.com' },
    { id: 7, name: 'John Doe', email: 'john@example.com' },
    { id: 8, name: 'Sarah Miller', email: 'sarah@example.com' },
    { id: 9, name: 'David Kim', email: 'david@example.com' },
    { id: 10, name: 'John Doe', email: 'john@example.com' },
    { id: 11, name: 'Sarah Miller', email: 'sarah@example.com' },
    { id: 12, name: 'David Kim', email: 'david@example.com' },
    { id: 13, name: 'John Doe', email: 'john@example.com' },
    { id: 14, name: 'Sarah Miller', email: 'sarah@example.com' },
    { id: 15, name: 'David Kim', email: 'david@example.com' }
  ];

  return NextResponse.json(users);
}
