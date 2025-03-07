'use client';

import * as z from "zod";
import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardWrapper } from "@/components/global/card-wrapper";
import { FormError } from '@/components/global/form-error';
import { FormSuccess } from '@/components/global/form-success';
import { RetailerRegister } from "../../../../action/register";


export default function AdminSignup() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
  
    const ExtendedRegisterSchema = z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters long"),
      passwordAgain: z.string(),
  }).refine((data) => data.password === data.passwordAgain, {
      message: "Passwords do not match",
      path: ["passwordAgain"], // Set the path where the error should be displayed
  });
  
    const form = useForm<z.infer<typeof ExtendedRegisterSchema>>({
      resolver: zodResolver(ExtendedRegisterSchema),
      defaultValues: {
        email: "",
        password: "",
        passwordAgain: "",
    },
  });
  
  const onSubmit = async (values: z.infer<typeof ExtendedRegisterSchema>) => {
    setError("");
    setSuccess("");
  
    // Check if passwords match before calling AdminRegister
    if (values.password !== values.passwordAgain) {
        setError("Passwords do not match!");
        return;
    }
  
    startTransition(async () => {
        const userData = {
            email: values.email,
            password: values.password,
            passwordAgain: values.passwordAgain,
          };
  
        const result = await RetailerRegister(userData); // Call AdminRegister function
  
        setError(result.error);
        setSuccess(result.success ? "Registration successful!" : undefined);
    });
  };
  
  
    return (
      <div className="flex-1 pt-10 md:px-16 w-full">
          <div className="flex flex-col h-full gap-3">
      <CardWrapper
              headerLabel='Sign up as Individual'
              backButtonLabel='Already have an account?'
              backButtonHref='/signin' // Update with the actual path for signing in
              showSocial
          >
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                          <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                          <Input
                                              {...field}
                                              disabled={isPending}
                                              placeholder="john@gmail.com"
                                              type="email"
                                              className="bg-muted"
                                          />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Password</FormLabel>
                                      <FormControl>
                                          <Input
                                              {...field}
                                              disabled={isPending}
                                              placeholder="********"
                                              type="password"
                                              className="bg-muted"
  
                                          />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="passwordAgain"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Password Again</FormLabel>
                                      <FormControl>
                                          <Input
                                              {...field}
                                              disabled={isPending}
                                              placeholder="********"
                                              type="password"
                                              className="bg-muted"
  
                                          />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                      <FormError message={error} />
                      <FormSuccess message={success} />
                      <Button
                          variant="secondary" className="w-full py-2 rounded-md border border-black dark:hover:bg-white dark:hover:shadow-white crimson-dusk text-white text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                          disabled={isPending}
                          type="submit"
                      >
                          Sign Up
                      </Button>
                  </form>
              </Form>
          </CardWrapper>
          </div>
          </div>
    );
  }
  
