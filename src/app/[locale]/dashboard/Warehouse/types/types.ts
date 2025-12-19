import { User } from '@sentry/nextjs';

// create modal interface
export interface CreateNewUserPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface FormValues {
  name: string;
  item: string;
  sku: string;
  color: string;
  upc: string;
  quantity: number;
  size: number;
}

// update modal interface
export interface FormValues {
  name: string;
  item: string;
  sku: string;
  color: string;
  upc: string;
  quantity: number;
  size: number;
}

export interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Delete modal interface
export interface DeleteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

// Heroheader section interface
export interface HeroHeaderProps {
  componentName: string;
  buttonName: string;
  handleButton: (state: boolean) => void;
}

export type RowActionMenuProps = {
  onUpdate: () => void;
  onDelete: () => void;
};

// User Table Props
export interface UserTableProps {
  users: User[];
  onUpdate: (user: User) => void;
  onDelete: (user: User) => void;
}
