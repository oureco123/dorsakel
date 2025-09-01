'use client';

import Dorsakel from '@/components/Dorsakel';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';

export default function AuthPage() {

  return (
  <AuthenticatedLayout>
    <Dorsakel />;
    </AuthenticatedLayout>
  );
}