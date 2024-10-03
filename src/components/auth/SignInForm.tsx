"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { credentialLogin } from "@/authActions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError(null);

    try {
      const response = await credentialLogin(values);

      if (!!response.error) {
        setError(response.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };
  return (
    <div>
      <Form {...form}>
        <div className='text-red-500 text-sm font-light'>{error}</div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FormField
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='example@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name='password'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='***********'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default SignInForm;
