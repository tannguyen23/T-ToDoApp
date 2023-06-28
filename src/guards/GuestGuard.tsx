import { ReactNode } from 'react';

interface GuestGuardProps {
  children: ReactNode;
}
export default function GuestGuard(props: GuestGuardProps) {
  return <>{props.children}</>;
}
