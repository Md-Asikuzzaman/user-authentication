import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FiPower } from 'react-icons/fi';
import { getSession, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <>
      <Head>
        <title>Welcome to Home page</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <header className='bg-fuchsia-800 py-5'>
          <div className='container flex justify-between items-center'>
            <h3 className='text-2xl uppercase font-semibold text-white'>
              Logo
            </h3>
            <div className='flex items-center gap-20'>
              <div className='flex items-center gap-3'>
                <Image
                  src={`${session ? session?.user?.image : '/favicon.ico'}`}
                  height='40'
                  width='40'
                  alt='profile'
                />
                <h5 className='text-lg text-white'>
                  {session && session?.user?.name}
                </h5>
              </div>
              <div className='flex items-center gap-5'>
                <button
                  onClick={() => signOut()}
                  className='bg-rose-500 py-1 px-4 text-white rounded-full shadow-md flex items-center gap-2'
                >
                  Sign out <FiPower />
                </button>
              </div>
            </div>
          </div>
        </header>
        <section className='display flex items-center justify-center flex-col'>
          <h1 className='text-3xl font-semibold text-fuchsia-800'>
            Welcome to User Page.
          </h1>
          <h3 className='text-2xl font-semibold mt-3 text-fuchsia-500'>
            {session && session?.user?.email}
          </h3>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
