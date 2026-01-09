import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const ShoppingCartSkeleton = ({ screenSize }: { screenSize: number }) => {
  return (
    <Drawer direction={screenSize < 767 ? 'bottom' : 'right'}>
      <div className="h-[3rem] w-[10rem] animate-pulse rounded-full bg-green-300 shadow" />

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="h-6 w-20 animate-pulse rounded bg-neutral-200" />

          <div className="mt-4 max-h-[12rem] space-y-3 overflow-hidden overflow-y-auto lg:max-h-[25rem]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex w-full animate-pulse items-center gap-3 rounded bg-neutral-100 p-3"
              >
                <div className="h-10 w-10 rounded bg-neutral-300" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 rounded bg-neutral-300" />
                  <div className="h-3 w-24 rounded bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        </DrawerHeader>

        <DrawerFooter className="w-full">
          <Button
            disabled
            className="flex w-full animate-pulse items-center justify-between gap-2 bg-green-300 py-[1.2rem]"
          >
            <span className="h-4 w-20 rounded bg-white/50" />
            <span className="h-4 w-10 rounded bg-white/50" />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCartSkeleton;
