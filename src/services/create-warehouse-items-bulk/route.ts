// import { WarehouseCSV } from '@/app/[locale]/dashboard/WarehouseItem/components/ImportWarehouseCSV';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const data: WarehouseCSV[] = await req.json();
//     console.log(' Received data on server:', data);

//     return NextResponse.json({
//       message: 'Data received successfully',
//       receivedCount: data.length,
//       dataSample: data.slice(0, 5),
//     });
//   } catch (error: any) {
//     console.error(' API error:', error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
