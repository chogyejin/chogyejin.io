import { getGuestbookEntries } from 'app/db/queries';
import { redirect } from 'next/navigation';
import Form from './form';
import { auth } from '@/auth';

export const metadata = {
  title: 'Admin',
};

export default async function GuestbookPage() {
  const session = await auth();

  if (session?.user?.email !== 'whrpwls96@naver.com') {
    redirect('/');
  }

  const entries = await getGuestbookEntries();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">admin</h1>
      <Form entries={entries} />
    </section>
  );
}
