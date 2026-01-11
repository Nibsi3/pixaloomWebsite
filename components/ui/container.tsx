import { cn } from '@/components/utils';

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('ml-0 mr-auto w-full max-w-[92rem] px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
