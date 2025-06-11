/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface UserAvatar {
  acf?: {
    acf_optionuser?: {
      user_avatar?: any
    };
  };
  avatar_urls?: {
    [key: number] : string
  };
}

export function getUserAvatar(user: UserAvatar | null | undefined): string | undefined {
  if (!user) return undefined;
  
  return user.acf?.acf_optionuser?.user_avatar || user.avatar_urls?.[48];
}