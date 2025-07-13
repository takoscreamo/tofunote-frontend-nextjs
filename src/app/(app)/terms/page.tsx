"use client";
import { TermsModal } from '@/components/common/TermsModal';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const router = useRouter();
  return (
    <TermsModal open={true} onClose={() => router.back()} />
  );
} 