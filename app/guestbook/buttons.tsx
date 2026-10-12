import { signIn, signOut } from '@/auth';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className="mt-2 mb-6 cursor-pointer text-xs text-neutral-700 dark:text-neutral-300">
        Sign out
      </button>
    </form>
  );
}

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button className="mb-8 inline-flex cursor-pointer items-center rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm/4 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
        <img alt="GitHub logo" src="/github-logo.svg" width="20" height="20" />
        <div className="ml-3">Sign in with GitHub</div>
      </button>
    </form>
  );
}
