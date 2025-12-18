import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { RowActionMenuProps } from '../types/types';

const RowActionMenu = ({ onUpdate, onDelete }: RowActionMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className='hover:bg-muted rounded p-2'
      >
        <FaEllipsisV />
      </button>

      {open && (
        <div className='absolute right-0 z-50 mt-2 w-24 rounded border bg-white shadow'>
          <button
            onClick={() => {
              onUpdate();
              setOpen(false);
            }}
            className='hover:bg-muted w-[90%] rounded-lg px-4 py-2 text-left'
          >
            Update
          </button>

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className='hover:bg-muted block w-full px-3 py-2 text-left text-red-500'
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RowActionMenu;
