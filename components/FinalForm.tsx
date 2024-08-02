"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { useToast } from "./ui/use-toast"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "FirstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "LastName must be greater than 2 characters"
  }),
  email: z.string().email({
    message: "Invalid email"
  }),
  queryType: z.enum(['general', 'technical'], {
    required_error: "Please select a query type"
  }),
  message: z.string().min(10, {
    message: "Message must be contained at least 10 characters"
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the term and the conditions"
  })
})

export function FinalForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          lastName: "", 
          email: "",
          queryType: "general",
          message: "",
          consent: false
        },
    })
    const { toast } = useToast();
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast({
          title: "You've submitted the following valuees:",
          description: "you've successfully submitted"
            // <pre className=" mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            //   <code className="text-white">{JSON.stringify(values, null, 2)}</code>
            // </pre>
          // )
        });        
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input placeholder="Tyler" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LastName</FormLabel>
              <FormControl>
                <Input placeholder="Durden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tyler01@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="queryType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Query Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="general" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      General
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="technical" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Technical
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and conditions
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
