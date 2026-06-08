import { NextLayoutWrapper } from '../../src/components/layout/NextLayoutWrapper';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextLayoutWrapper>{children}</NextLayoutWrapper>;
}
