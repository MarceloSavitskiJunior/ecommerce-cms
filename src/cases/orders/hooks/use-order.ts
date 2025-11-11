import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderDTO } from "../dtos/order.dto";
import { OrderService } from "../service/order.service";
import { toast } from "react-toastify";

export function useOrders() {
    return useQuery<OrderDTO[]>({
       queryKey: ['orders'],
       queryFn: OrderService.list
    });
}

export function useOrderById(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ['order', id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient()

    return useMutation<OrderDTO, Error, Omit<OrderDTO, 'id'>>({
        mutationFn: (order: Omit<OrderDTO, 'id'>) => OrderService.create(order),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']})
            toast.success('Registro adicionado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao adicionar pedido: ${error.message}`)
        }
    })
}

export function useUpdateOrder() {
    const queryClient = useQueryClient()

    return useMutation<OrderDTO, Error, {id: string, order: OrderDTO}>({
        mutationFn: ({id, order}) => OrderService.update(id, order),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']})
            toast.success('Registro alterado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao alterar pedido: ${error.message}`)
        }
    })
}

export function useDeleteOrder() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id) => OrderService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']})
            toast.success('Registro excluído com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao excluir pedido: ${error.message}`)
        }
    })
}