"use client";
import { montserrat } from '@/app/ui/fonts';
import ChangeIcon from './card-item/change-icon';
import CatalogIcon from './card-item/catalog-icon';
import CalendarIcon from './card-item/calendar-icon';
import { PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@mui/material';

const AddIcon = () => {
  return <div className="w-8 h-8">
    <PlusIcon color='#40CEB9' />
  </div>
}

const AIIcon = () => {
  return <div className="w-8 h-8">
    <SparklesIcon color='#40CEB9' />
  </div>
}

const iconMap = {
  change: ChangeIcon,
  catalog: CatalogIcon,
  calendar: CalendarIcon,
  add: AddIcon,
  ai: AIIcon,
};


interface Props {
  title: string;
  type: 'change' | 'catalog' | 'calendar' | 'add' | 'ai';
  onClick?: () => void;
}

export function Card({ title, type, onClick = () => { } }: Props) {
  const Icon = iconMap[type];

  return (
    <IconButton onClick={onClick} className="p-0" sx={{ padding: 0}}>
      <div className="w-[100px] h-[100px] bg-[#e8f3fb] rounded-[17.95px] flex flex-col items-center justify-center gap-2
    shadow-[19px_21px_50px_0px_rgba(176,195,210,0.73),-8px_0px_8px_0px_rgba(244,248,251,0.50),-8px_-40px_22px_0px_rgba(246,251,255,0.38),-11px_-11px_20px_0px_rgba(255,255,255,0.27)]">
        {Icon ? <Icon /> : null}
        <h3 className={`${montserrat.className} font-weight-900 text-[16px]`}>
          {title}
        </h3>
      </div>
    </IconButton>
  );
}
