import { getGuestbookEntries } from 'app/db/queries';
import { SignIn, SignOut } from './buttons';
import { Suspense } from 'react';
import Form from './form';
import { auth } from '@/auth';

export const metadata = {
  title: '방명록',
  description: '편하게 방명록을 남겨주세요!',
};

export default function GuestbookPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        방명록 남기기
      </h1>
      <Suspense>
        <GuestbookForm />
        <GuestbookEntries />
      </Suspense>
    </section>
  );
}

async function GuestbookForm() {
  const session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  const entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="mb-4 flex flex-col space-y-1">
      <div className="w-full text-sm wrap-break-word">
        <span className="mr-1 text-neutral-600 dark:text-neutral-400">
          {entry.created_by}:
        </span>
        {entry.body}
      </div>
    </div>
  ));
}
