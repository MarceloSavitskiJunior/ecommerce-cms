import { useNavigate, useParams } from "react-router-dom";
import { useCategory, useCreateCategory, useDeleteCategory, useUpdateCategory } from "../hooks/use-category";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SidebarForm } from "@/components/layout/sidebar-form";


const categoryFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres").max(60, "O nome deve ter no máximo 60 caracteres"),
});

export function CategoryForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()
  const { data, isLoading } = useCategory(id ?? "");
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: data?.name ?? "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({ name: data.name });
    }
  }, [data]);

  function onSubmit(value: z.infer<typeof categoryFormSchema>) {
    if (id) {
      updateCategory.mutate(
        {id: value.id},
        {
            onSettled: () => {
                navigate('/categories')
            }
        }
      );
    } else {
      createCategory.mutate(
        {name: value.name},
        {
            onSettled: () => {
                navigate('/categories')
            }
        }
      );
    }
  }

  function onDelete() {
    if (id) {
        deleteCategory.mutate(id, {
            onSettled: () => {
                navigate('/categories')
            }
        })
    }
  }

  return (
    <SidebarForm
      loading={isLoading}
      sheetTitle={`${id ? 'Editar' : 'Adicionar'} categoria`}
      buttonTitle="Salvar categoria"
      onSave={form.handleSubmit(onSubmit)}
      {...(id && { onDelete: onDelete })}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </SidebarForm>
  );
}
