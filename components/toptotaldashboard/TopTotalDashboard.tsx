import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { BookText, FolderOpenDot, Newspaper, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const dataTotalFetch = [
    {
        name: 'Posts',
        total: '1.890',
        icon: <Newspaper strokeWidth={1.5} className='w-8 h-8 text-green-500' />,
        url: '/',
        colorClass: 'text-green-400',
        growUp: '45'
    },
    {
        name: 'Users',
        total: '115',
        icon: <Users strokeWidth={1.5} className='w-8 h-8 text-red-500' />,
        url: '/',
        colorClass: 'text-red-400',
        growUp: '23'
    },
    {
        name: 'Projects',
        total: '210',
        icon: <FolderOpenDot strokeWidth={1.5} className='w-8 h-8 text-purple-500' />,
        url: '/',
        colorClass: 'text-purple-400',
        growUp: '68'
    },
    {
        name: 'Categories',
        total: '86',
        icon: <BookText strokeWidth={1.5} className='w-8 h-8 text-yellow-500' />,
        url: '/',
        colorClass: 'text-yellow-400',
        growUp: '67'
    }
]

const TopTotalDashboard = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 mb-4'>
            {dataTotalFetch && dataTotalFetch.length > 0 && dataTotalFetch.map((item, idx) =>
                <BlockToTal item={item} key={idx} />
            )}
        </div>
    );
}

const BlockToTal = ({ ...params }) => {
    const { name, total, icon, url, colorClass, growUp } = params.item
    return (
        <div className='bg-primary-foreground p-6 rounded-xl'>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center gap-4'>
                    <h3 className='leading-none text-md font-semibold'>Total {name}</h3>
                    {icon}
                </div>
                <div className={clsx(
                    'text-5xl font-bold',
                    colorClass
                )}>{total}</div>
                <div className="flex justify-between items-center gap-4">
                    <Button variant='link' className='text-xs p-0 text-muted-foreground'>
                        <Link href={url}>View All</Link>
                    </Button>
                    <div className={clsx(
                        'flex flex-row-1 justify-end gap-2  text-sm',
                        colorClass
                    )}>
                        <TrendingUp className='w-5 h-5' /> {growUp}%
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopTotalDashboard;
