const CheckoutSkeleton = () => {
  return (
    <section className="flex min-h-screen w-full flex-col bg-neutral-200">
      <div className="flex h-[4rem] items-center gap-2 bg-white px-[3%]">
        <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-300" />
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-300" />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center p-[3%] md:flex-row md:justify-between">
        {/* Left panel */}
        <div className="flex h-full w-full flex-col gap-4 md:w-[50%]">
          <div className="h-[10rem] w-full animate-pulse rounded-lg bg-white p-[2%]" />
          <div className="hidden h-40 w-full animate-pulse rounded-lg bg-white p-[2%] md:block" />
        </div>

        {/* Right panel */}
        <div className="flex w-full flex-col gap-4 md:w-[40%]">
          <div className="max-h-[15rem] w-full animate-pulse rounded-lg bg-white p-[2%]" />
          <div className="h-40 w-full animate-pulse rounded-lg bg-white p-[3%]" />
          <div className="block h-16 w-full animate-pulse rounded-lg bg-white p-[2%] md:hidden" />
        </div>
      </div>
    </section>
  );
};

export default CheckoutSkeleton;
