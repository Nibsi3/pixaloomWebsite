import { LoadingScreen } from '@/components/loading-screen';

export default function OSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoadingScreen />
      {children}
    </>
  );
}
