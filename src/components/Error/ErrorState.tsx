type ErrorStateProps = {
  message?: string;
};

export function ErrorState({
  message = 'Something went wrong. Please try again'
}: ErrorStateProps) {
  return (
    <div className='flex h-100 items-center justify-center'>
      <p className='text-lg text-red-500'>{message}</p>
    </div>
  );
}
