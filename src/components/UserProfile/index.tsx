"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

import type { User } from "@/types/user.types";
import { ArrowLeft } from "lucide-react";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string().max(6),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
});

export default function UserProfile() {
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const userId = params.id;

  const [loading, setLoading] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: async (): Promise<User> => {
      const response = await fetch(`/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (users: User) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(users),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: (res) => {
      toast({
        description: res.message,
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
    },
    onError: () => {
      toast({
        description: "An error occured!",
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: 0,
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        id: Number(data.id),
        name: data.name,
        username: data.username,
        email: data.email,
        address: {
          street: data.address.street,
          suite: data.address.suite,
          city: data.address.city,
          zipcode: data.address.zipcode ? data.address.zipcode : "",
          geo: data.address.geo
            ? {
                lat:
                  data.address.geo.lat !== undefined &&
                  data.address.geo.lat !== null
                    ? data.address.geo.lat
                    : "",
                lng:
                  data.address.geo.lng !== undefined &&
                  data.address.geo.lng !== null
                    ? data.address.geo.lng
                    : "",
              }
            : {
                lat: "",
                lng: "",
              },
        },
        phone: data.phone || "",
        website: data.website || "",
        company: data.company || null,
      });
    }
  }, [data, form]);

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <Button variant="outline" asChild className="w-fit">
        <Link href={"/"}>
          <ArrowLeft /> Go Back
        </Link>
      </Button>
      {isError ? (
        <h1 className="pb-4 text-red-400">
          An error occured: {JSON.stringify(error)}
        </h1>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div
            className="rounded-xl border border-muted-foreground/50 p-4"
            id="form-GeneralInformation"
          >
            <h1 className="pb-4">General Information</h1>
            {isLoading ? (
              <Skeleton className="h-[20px] w-full rounded-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name here..."
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                        This is your public display name.
                    </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your username here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>E-Mail</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your e-mail here..."
                            {...field}
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your website here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <div
            className="rounded-xl border border-muted-foreground/50 p-4"
            id="form-Address"
          >
            <h1 className="pb-4">Address</h1>
            {isLoading ? (
              <Skeleton className="h-[20px] w-full rounded-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your street here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.suite"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Suite</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your suite here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your city here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.zipcode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Zipcode</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your zipcode here..."
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="address.geo.lat"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your latitude here..."
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.geo.lng"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your longitude here..."
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className="rounded-xl border border-muted-foreground/50 p-4"
            id="form-Company"
          >
            <h1 className="pb-4">Company</h1>
            {isLoading ? (
              <Skeleton className="h-[20px] w-full rounded-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="company.name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your company name here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company.catchPhrase"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Company Catchphrase</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your company catchphradse here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company.bs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company BS</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your company bs here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {!isLoading && !isError && (
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          )}
        </form>
      )}
    </Form>
  );
}
