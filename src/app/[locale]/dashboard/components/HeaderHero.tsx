import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

interface HeroHeaderProps {
  componentName: string;
  buttonName: string;
  handleButton: (state: boolean) => void;
}

const HeaderHero: FC<HeroHeaderProps> = ({
  componentName,
  buttonName,
  handleButton
}) => {
  return (
    <div>
      <div className='flex flex-row justify-between py-5'>
        <h1 className='text-3xl font-bold'>{componentName}</h1>
        <Button onClick={() => handleButton(true)}>{buttonName}</Button>
      </div>
    </div>
  );
};

export default HeaderHero;
