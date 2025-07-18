const AuthLayout=({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="overflow-hidden flex items-center justify-center min-h-screen">
        <div className='w-[600px] z-10 ld:w-full flex flex-col items-center p-6 ' >
        {children}
        </div>
        <div className='hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden
        relative bg-cream flex-col pt-10 pl-24 gap-3 ' >
            <h2 className='text-gravel md:text-8xl font-bold text-white ' >
                Join Us
            </h2>
        </div>
    </div >
  );
}


export default AuthLayout;
