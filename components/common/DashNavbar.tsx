"use client"
import { LogOut, Moon, Sun, Settings, User, ChevronDown, Bell, Trash } from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const DashNavbar = () => {
    return (
        <nav className='c-navbar p-4 flex items-center justify-between gap-10'>
            <SidebarTrigger />
            <div className='flex flex-grow-1 justify-end items-center gap-4'>
                <NotificationBar />
                <ThemeDarkMode />
                <UserDropdown />
            </div>
        </nav>
    );
}

const NotificationBar = () => (
    <div className='p-notification'>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='cursor-pointer relative rounded-full' variant="secondary" size="icon">
                    <Bell className="h-5 w-5" />
                    <Badge variant='destructive' className='rounded-full absolute top-[-6px] right-[-6px] w-5 h-5 text-xs font-semibold text-center flex justify-center'>
                        5
                    </Badge>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} align={'center'} className='w-80 p-0'>
                <div className='p-notification'>
                    <div className='flex justify-between items-center gap-5 py-5 p-4 border-b'>
                        <h3 className='text-md font-bold'>Notifications</h3>
                        <Badge variant='secondary' className="dark:text-green-400 text-red-500">5 Unread</Badge>
                    </div>
                    <div className="p-notification_list">
                        <ScrollArea scrollHideDelay={600} className="overflow-y-auto scrollbar-hide w-full min-h-[100px] max-h-[300px]">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div className="p-notification_item px-4 py-3 flex grid-rows-1 justify-between gap-2 not-first:border-t hover:bg-gray-200 hover:dark:bg-gray-800" key={index}>
                                    <div className="p-notification_item_body">
                                        <h5 className='text-sm font-semibold dark:text-gray-200 mb-1'>Lorem, ipsum dolor sit amet consectetur adipisicing.</h5>
                                        <p className='text-xs text-gray-400'>1 day ago</p>
                                    </div>
                                    <div className="p-notification_item_cta min-w-fit ms-2 text-end">
                                        <Button size="icon" variant={'outline'} className='cursor-pointer hover:bg-red-500 hover:text-white dark:hover:bg-red-800'>
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                    <div className="p-notification_footer p-4 border-t">
                        <Button variant='secondary' className='w-full cursor-pointer capitalize'>
                            View all
                        </Button>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
)

const ThemeDarkMode = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className='p-themeMode'>
            {mounted && (
                theme === 'light' ? (
                    <Button className='cursor-pointer rounded-full' variant="secondary" size="icon" onClick={() => setTheme("dark")}>
                        <Moon className="h-5 w-5" />
                    </Button>
                ) : (
                    <Button className='cursor-pointer rounded-full' variant="secondary" size="icon" onClick={() => setTheme("light")}>
                        <Sun className="h-5 w-5" />
                    </Button>
                )
            )}
        </div>
    )
}

const UserDropdown = () => (
    <div className="p-userDropdown">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className="py-6 px-4">
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h5 className='text-xs font-bold text-gray-700 dark:text-gray-200'>NgoanMc</h5>
                        <ChevronDown />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} align={'end'} className='min-w-40'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings />
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant='destructive'>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
)

export default DashNavbar;
