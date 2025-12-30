import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ReceiverCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receiver</CardTitle>
      </CardHeader>

      <CardContent className='flex items-end justify-between'>
        <div className='text-muted-foreground text-sm'>
          <p>Name</p>
          <p>Address</p>
        </div>

        <Button size='sm'>Create new</Button>
      </CardContent>
    </Card>
  );
};

export default ReceiverCard;
