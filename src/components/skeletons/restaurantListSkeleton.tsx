const RestaurantListSkeleton = () => {
  return (
    <section>
      <div className="flex animate-pulse flex-col gap-2">
        <div className="h-[10rem] w-[9rem] rounded-2xl bg-neutral-200 md:w-[15rem]" />
        <div className="h-4 w-3/4 rounded bg-neutral-300" />
        <div className="flex items-center gap-2">
          <div className="h-3 w-10 rounded bg-neutral-200" />
          <div className="h-3 w-16 rounded bg-neutral-200" />
        </div>
      </div>
    </section>
  );
};

export default RestaurantListSkeleton;
