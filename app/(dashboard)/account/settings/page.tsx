/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Loader2Icon, Pencil, X } from "lucide-react";
import { useAuth } from '@/lib/providers/AuthProvider';
import { User } from '@/types/user';
import { getUserAvatar } from '@/lib/utils';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { deleteAvatarUser, updateUser } from '@/lib/store/features/userSlice';
import { toast } from 'sonner';
import { api_uploadMediaImage } from '@/lib/api/media';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

const PageProfile = () => {
    const { user } = useAuth();
    const dispatch = useAppDispatch()
    const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
    const [isUploading, setIsUploading] = React.useState<boolean>(false);
    const [uEmail, setUEmail] = React.useState<string>('');
    const [uName, setUName] = React.useState<string>('');
    const [uFullName, setUFullName] = React.useState<string>('');
    const [uPhone, setUPhone] = React.useState<string>('');
    const [uAvatar, setUAvatar] = React.useState<any>('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            if (user?.email) { setUEmail(user.email) }
            if (user?.name) { setUName(user.name) }
            if (user?.acf?.acf_optionuser?.user_fullname) { setUFullName(user?.acf?.acf_optionuser?.user_fullname) }
            if (user?.acf?.acf_optionuser?.user_phone) { setUPhone(user?.acf?.acf_optionuser?.user_phone) }
            if (user?.acf?.acf_optionuser?.user_avatar) { setUAvatar(user?.acf?.acf_optionuser?.user_avatar) }
        }
    }, [user]);

    const handleUpdateUser = async (): Promise<void> => {
        const dataUser:User = {
            id: user?.id,
            email: uEmail,
            name: uName,
            acf: {
                acf_optionuser: {
                  user_fullname: uFullName,
                  user_phone: uPhone,
                }
            }
        }
        try {
            setIsSubmit(true)
            await dispatch(updateUser(dataUser))
            toast.success('Cập nhật thành công');
        } catch (error) {
            throw error;
        } finally {
            setIsSubmit(false)
        }
    }

    

    const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Kiểm tra kích thước file (giới hạn 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Kích thước file không được vượt quá 2MB');
            return;
        }

        // Kiểm tra định dạng file
        if (!file.type.startsWith('image/')) {
            toast.error('File phải là hình ảnh');
            return;
        }

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            // Upload ảnh lên WordPress Media Library
            const uploadResponse = await api_uploadMediaImage(formData)
            const mediaId = uploadResponse.id;
            const imageUrl = uploadResponse.source_url;

            // Cập nhật state với URL ảnh mới
            setUAvatar(imageUrl);
            const mixinAvartaUser = (userID:any, userAvatar?:any) => (
                {
                    id: userID,
                    acf: {
                        acf_optionuser: {
                            user_avatar: userAvatar
                        }
                    }
                }
            )
            // Chỉ cập nhật trường ACF
            const dataUser: User = mixinAvartaUser(user?.id, mediaId)
            await dispatch(updateUser(dataUser));
            toast.success('Cập nhật avatar thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi upload ảnh');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveAvatar = async () => {
        try {
            setIsUploading(true);
            setUAvatar('');
            await dispatch(deleteAvatarUser(user?.id))
            toast.success('Xóa avatar thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa avatar');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className='w-full rounded-xl p-6 bg-primary-foreground'>
            <h2 className='text-xl font-semibold mb-6'>Settings</h2>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                    <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
                    <TabsTrigger value="posts">Bài viết của tôi</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông tin cá nhân</CardTitle>
                            <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage
                                        src={uAvatar ? uAvatar : getUserAvatar(user)} 
                                    />
                                </Avatar>
                                <div className="flex gap-2">
                                    <Input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleUploadAvatar}
                                    />
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading || isSubmit}
                                    >
                                        {isUploading ? (
                                            <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                            <Pencil className="h-4 w-4 mr-2" />
                                        )}
                                        Upload
                                    </Button>
                                    {uAvatar &&
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="text-red-500"
                                            onClick={handleRemoveAvatar}
                                            disabled={isUploading || isSubmit}
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Xóa
                                        </Button>
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label>Họ và tên</Label>
                                    <Input
                                        id="full_name"
                                        name="full_name"
                                        value={uFullName}
                                        onChange={(e) => setUFullName(e.target.value)}
                                        placeholder="Nhập họ và tên"
                                        maxLength={25}
                                        disabled={isUploading || isSubmit}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={uEmail}
                                        onChange={(e) => setUEmail(e.target.value)}
                                        placeholder="Nhập email"
                                        disabled
                                        readOnly
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Tên hiển thị</Label>
                                    <Input
                                        id="display_name"
                                        name="display_name"
                                        value={uName}
                                        onChange={(e) => setUName(e.target.value)}
                                        placeholder="Nhập tên hiển thị"
                                        maxLength={20}
                                        disabled={isUploading || isSubmit}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Số điện thoại</Label>
                                    <Input
                                        id="phone"
                                        type="number"
                                        value={uPhone}
                                        onChange={(e) => setUPhone(e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                        maxLength={11}
                                        disabled={isUploading || isSubmit}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Tùy chọn</Label>
                                    <Select disabled={isUploading || isSubmit}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn một tùy chọn" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="option1">Tùy chọn 1</SelectItem>
                                            <SelectItem value="option2">Tùy chọn 2</SelectItem>
                                            <SelectItem value="option3">Tùy chọn 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button
                                disabled={isUploading || isSubmit}
                                type='submit'
                                onClick={handleUpdateUser}
                                className="w-full"
                            >
                                Lưu thay đổi
                                {isSubmit && <Loader2Icon className="animate-spin" />}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Đổi mật khẩu</CardTitle>
                            <CardDescription>Cập nhật mật khẩu của bạn</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ForgotPasswordForm/>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="posts">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bài viết của tôi</CardTitle>
                            <CardDescription>Danh sách các bài viết bạn đã đăng</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Placeholder cho danh sách bài viết */}
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium">Bài viết mẫu 1</h3>
                                    <p className="text-sm text-gray-500">Ngày đăng: 01/01/2024</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium">Bài viết mẫu 2</h3>
                                    <p className="text-sm text-gray-500">Ngày đăng: 02/01/2024</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default PageProfile;
