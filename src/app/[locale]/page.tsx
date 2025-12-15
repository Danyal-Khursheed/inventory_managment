// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { locale: string } }) {
  // const { userId } = await auth();
  return redirect(`/${params.locale}/dashboard`);
}
