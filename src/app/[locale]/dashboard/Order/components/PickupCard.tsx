import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const PickupCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pickup</CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='text-muted-foreground text-sm'>
          <p>Address</p>
          <p>Country</p>
        </div>

        <Button variant='outline' className='w-full justify-start gap-2'>
          <Search className='h-4 w-4' />
          Select Other
        </Button>
      </CardContent>
    </Card>
  );
};

export default PickupCard;
