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

export interface DeleteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export interface HeroHeaderProps {
  componentName: string;
  buttonName: string;
  handleButton: (state: boolean) => void;
}

export type RowActionMenuProps = {
  onUpdate: () => void;
  onDelete: () => void;
};

export interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateUserFormData) => void;
  loading?: boolean;
}

export interface CreateUserFormData {
  name: string;
  sku: string;
  quantity: number;
}
