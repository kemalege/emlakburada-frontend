import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AdDetails } from '@/types/api';
import Image from 'next/image';
import React from 'react';

const AdDetail: React.FC<{ ad: AdDetails }> = ({ ad }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ad.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:w-1/2'>
            <Image
              src='/no-image.png'
              alt='Ad Image'
              width={500}
              height={500}
              className='object-cover'
            />
          </div>
          <div className='lg:w-1/2 p-4'>
            <div>
              <p className='font-bold text-lg text-blue-700'>{ad.price.toLocaleString()} TL</p>
              <p>Konum: {ad.location}</p>
              <Separator orientation="horizontal" />
              <p>Yayınlanma Tarihi: {new Date(ad.createDate).toLocaleDateString()}</p>
              <Separator orientation="horizontal" />
              <p>Kategori: {ad.category}</p>
              <Separator orientation="horizontal" />
              <p>Açıklama: {ad.details}</p>
            </div>
            <div className='mt-4'>
              <div className='flex items-center'>
                <div>
                  <p>{ad.user.name} {ad.user.surname}</p>
                  <Separator orientation="horizontal" />
                  <p>E-posta: {ad.user.email}</p>
                  <Separator orientation="horizontal" />
                  {ad.user.phoneNumber && <p>İletişim: {ad.user.phoneNumber}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdDetail;
