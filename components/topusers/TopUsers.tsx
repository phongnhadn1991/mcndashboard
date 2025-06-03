import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const roleUsers = { admin: 'Admin', editor: 'Editor', user: 'User' }

const listUsersPost = [
    {
        id: 1,
        username: 'NgoanMc',
        level: roleUsers.admin,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
        id: 2,
        username: 'LinhNguyen',
        level: roleUsers.user,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    {
        id: 3,
        username: 'HoangTran',
        level: roleUsers.editor,
        avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg'
    },
    {
        id: 4,
        username: 'MaiAnh',
        level: roleUsers.user,
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg'
    },
    {
        id: 5,
        username: 'TuanLe',
        level: roleUsers.admin,
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    }
]

const TopUsers = () => {
    return (
        <Card className='bg-primary-foreground border-0 h-full'>
            <CardHeader>
                <CardTitle>Top Users</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    {listUsersPost.map((item, index) => (
                        <Card key={index} className='flex flex-row gap-4 p-3 justify-between items-center'>
                            <div className='w-12 h-12 rounded-sm relative overflow-hidden'>
                                <Image src={item.avatar} alt={item.username} fill sizes='100%' className='object-cover' />
                            </div>
                            <div className='flex-1 flex-col gap-2'>
                                <h4 className='text-sm font-semibold mb-1'>
                                    {item.username}
                                </h4>
                                <Badge variant="secondary" className={
                                    clsx(
                                        'capitalize text-[11px]',
                                        { 'bg-red-900 text-white': item.level === roleUsers.admin }
                                    )
                                }>
                                    {item.level}
                                </Badge>
                            </div>
                            <div>
                                <span className='text-sm font-medium'>{(Math.round(Math.random() * 100) / 10)}K</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card >
    );
}

export default TopUsers;
