"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Loader } from "lucide-react"

import type * as z from "zod"
import type { Cluster } from "../_lib/types"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { updateCluster } from "../_lib/queries"
import { updateClusterSchema } from "../_lib/validations"

type FormData = z.infer<typeof updateClusterSchema>

interface ClusterEditSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  cluster: Cluster | null
}

export function ClusterEditSheet({ cluster, ...props }: ClusterEditSheetProps) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<FormData>({
    resolver: zodResolver(updateClusterSchema),
    defaultValues: {
      name: cluster?.name ?? "",
      description: cluster?.description ?? "",
      type: cluster?.type,
      status: cluster?.status,
      tags: cluster?.tags ?? [],
      isBlocklist: cluster?.isBlocklist ?? false,
    },
  })

  function onSubmit(input: FormData) {
    startTransition(async () => {
      if (!cluster) return

      try {
        await updateCluster(cluster.id, input)
        toast.success("Cluster updated successfully")
        props.onOpenChange?.(false)
      } catch (_error) {
        toast.error("Failed to update cluster")
      }
    })
  }

  React.useEffect(() => {
    if (cluster) {
      form.reset({
        name: cluster.name,
        description: cluster.description,
        type: cluster.type,
        status: cluster.status,
        tags: cluster.tags,
        isBlocklist: cluster.isBlocklist,
      })
    }
  }, [cluster, form])

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Edit cluster</SheetTitle>
          <SheetDescription>
            Update the cluster information. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter cluster name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter cluster description..."
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cluster type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="influencers">Influencers</SelectItem>
                      <SelectItem value="micro-influencers">
                        Micro Influencers
                      </SelectItem>
                      <SelectItem value="nano-influencers">
                        Nano Influencers
                      </SelectItem>
                      <SelectItem value="celebrities">Celebrities</SelectItem>
                      <SelectItem value="brands">Brands</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isBlocklist"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Blocklist</FormLabel>
                    <div className="text-[0.8rem] text-muted-foreground">
                      Mark this cluster as a blocklist
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={isPending}>
                {isPending && (
                  <Loader
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
