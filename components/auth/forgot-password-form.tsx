/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2Icon } from "lucide-react";
import { api_changePasswordUser } from "@/lib/api/user";
import { toast } from "sonner";


export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isSubmit, setisSubmit] = React.useState(false);

  const FormSchema = z.object({
    current_password: z.string()
        .nonempty("Mật khẩu hiện tại là bắt buộc.")
        .min(6,"Current Password phải có ít nhất 6 ký tự."),
    new_password: z.string()
        .nonempty("Mật khẩu mới là bắt buộc.")
        .min(6,"Password phải có ít nhất 6 ký tự."),
    new_confirmPassword: z.string()
        .nonempty("Xác nhận mật khẩu mới là bắt buộc.")
  }).superRefine((data, ctx) => {
    if (data.new_password === data.current_password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu mới không được trùng với mật khẩu hiện tại",
            path: ["new_password"]
        });
    }
    if (data.new_password !== data.new_confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu xác nhận không khớp",
            path: ["new_confirmPassword"]
        });
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_confirmPassword: "",
    },
  })

  const resetPassword = () => {
    form.setValue('current_password', '');
    form.setValue('new_password', '');
    form.setValue('new_confirmPassword', '');
  }

  const handleRegister = async (data: z.infer<typeof FormSchema>) => {
    try {
      setisSubmit(true)
      await api_changePasswordUser(data)
      toast.success('Mật khẩu đã được cập nhật thành công!');
      form.reset()
    } catch (error: any) {
      resetPassword()
      if(error.status === 403) {
        toast.error('Mật khẩu hiện tại không đúng!');
      }
    } finally {
      setisSubmit(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Mật khẩu hiện tại</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="new_confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Xác nhận mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isSubmit} type="submit" className="w-full mt-1">
                Cập nhật mật khẩu
                {isSubmit && <Loader2Icon className="animate-spin" />}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
