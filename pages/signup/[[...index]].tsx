import { NextPage } from 'next';
import {
  AiOutlineUser,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { MdLockOutline, MdAlternateEmail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebookOption } from 'react-icons/gr';
import Link from 'next/link';
import { useState } from 'react';

interface Props {}

const Index: NextPage<Props> = ({}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleShowPassword = (): void => {
    setShowPassword(true);
  };

  const handleHiddenPassword = (): void => {
    setShowPassword(false);
  };

  const handleConfirmShowPassword = (): void => {
    setShowConfirmPassword(true);
  };

  const handleConfirmHiddenPassword = (): void => {
    setShowConfirmPassword(false);
  };

  return (
    <div className='h-screen bg-gradient-to-tr to-indigo-500 from-teal-500 flex justify-center items-center'>
      <div className='shrink-0 max-w-[430px] w-full px-3'>
        <form className='bg-white rounded-md overflow-hidden shadow-md py-8 px-6'>
          <h2 className='text-center text-2xl font-semibold mb-6 text-fuchsia-800'>Sign Up</h2>

          <label htmlFor='username'>Username *</label>
          <div className='relative mb-4 mt-1'>
            <AiOutlineUser className='absolute top-0 left-3 bottom-0 my-auto text-base' />
            <input
              type='text'
              placeholder='Username'
              name='username'
              id='username'
              className='w-full outline-none bg-slate-100 pl-10 py-2 pr-2 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
            />
          </div>

          <label htmlFor='email'>Email *</label>
          <div className='relative mb-4 mt-1'>
            <MdAlternateEmail className='absolute top-0 left-3 bottom-0 my-auto text-base' />
            <input
              type='text'
              placeholder='Email Address'
              name='email'
              id='email'
              className='w-full outline-none bg-slate-100 pl-10 py-2 pr-2 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
            />
          </div>

          <label htmlFor='password'>Password *</label>
          <div className='relative mb-4 mt-1'>
            <MdLockOutline className='absolute top-0 left-3 bottom-0 my-auto text-base' />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              id='password'
              className='w-full outline-none bg-slate-100 pl-10 py-2 pr-10 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
            />
            <div className='absolute top-0 right-3 bottom-0 my-auto text-base  grid place-content-center'>
              {showPassword ? (
                <AiOutlineEyeInvisible
                  onClick={handleHiddenPassword}
                  className='cursor-pointer'
                />
              ) : (
                <AiOutlineEye
                  onClick={handleShowPassword}
                  className='cursor-pointer'
                />
              )}
            </div>
          </div>

          <label htmlFor='cpassword'>Confirm Password *</label>
          <div className='relative mt-1'>
            <MdLockOutline className='absolute top-0 left-3 bottom-0 my-auto text-base' />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              name='cpassword'
              id='cpassword'
              className='w-full outline-none bg-slate-100 pl-10 py-2 pr-10 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
            />
            <div className='absolute top-0 right-3 bottom-0 my-auto text-base  grid place-content-center'>
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  onClick={handleConfirmHiddenPassword}
                  className='cursor-pointer'
                />
              ) : (
                <AiOutlineEye
                  onClick={handleConfirmShowPassword}
                  className='cursor-pointer'
                />
              )}
            </div>
          </div>

          <button className='uppercase bg-fuchsia-800 w-full mt-5 py-1 text-white rounded-3xl select-none'>
            Sign Up
          </button>
          <p className='text-center py-4'>Or</p>
          <div className='flex justify-center gap-3'>
            <span className='h-9 w-9 bg-slate-200 rounded-full grid place-content-center cursor-pointer shadow-md'>
              <FcGoogle className='text-xl' />
            </span>

            <span className='h-9 w-9 bg-blue-800 rounded-full grid place-content-center cursor-pointer shadow-md'>
              <GrFacebookOption className='text-xl text-white' />
            </span>

            <span className='h-9 w-9 bg-black rounded-full grid place-content-center cursor-pointer shadow-md'>
              <AiOutlineGithub className='text-xl text-white' />
            </span>

            <span className='h-9 w-9 bg-sky-600 rounded-full grid place-content-center cursor-pointer shadow-md'>
              <AiOutlineTwitter className='text-xl text-white' />
            </span>
          </div>
          <p className='text-center mt-8 text-slate-600 text-sm'>
            Already have an account?
            <Link
              className='hover:underline text-fuchsia-800 ml-1'
              href='/signin'
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Index;
