import { BugAntIcon } from '@heroicons/react/24/outline';
import { montserrat } from '@/app/ui/fonts';

export default function PlantDiscoveryLogo() {
  return (
    <div
      className={`${montserrat.className} flex flex-row items-center leading-none text-white`}
    >
      <BugAntIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[24px]">Plant Discovery</p>
    </div>
  );
}
