import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const AdditionalInfoCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div>
          <Label>Cash On Delivery (COD)?</Label>

          <RadioGroup defaultValue='no' className='mt-2 flex gap-6'>
            <div className='flex items-center gap-2'>
              <RadioGroupItem value='yes' id='cod-yes' />
              <Label htmlFor='cod-yes'>Yes</Label>
            </div>

            <div className='flex items-center gap-2'>
              <RadioGroupItem value='no' id='cod-no' />
              <Label htmlFor='cod-no'>No</Label>
            </div>
          </RadioGroup>
        </div>

        <Input placeholder='Reference ID' />
        <Input placeholder='Instructions' />
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoCard;
