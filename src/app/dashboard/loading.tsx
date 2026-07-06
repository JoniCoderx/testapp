import { SkeletonGrid } from '@/components/States';

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <div className="skeleton mb-3 h-8 w-48 rounded" />
      <div className="skeleton mb-8 h-4 w-72 rounded" />
      <SkeletonGrid count={6} />
    </div>
  );
}
