"use client";
import { ROUTES } from '@/constants/routes';
import { useRouter } from "next/navigation";
import React from 'react';

const PageAccount = () => {
    const router = useRouter()
    React.useEffect(() => {
        router.push(ROUTES.account_settings)
    }, [router]);
}

export default PageAccount;
