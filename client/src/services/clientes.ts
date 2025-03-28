'use server'

import { ClienteResponseType, FetchResponseType } from '@/models/response-model';
import toast from 'react-hot-toast';

export const getClientes = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: "include",
            cache: "no-store"
        })
        const result: FetchResponseType<ClienteResponseType[]> = await res.json()

        if (result.status == 200) {
            return result
        }
        if (result.status == 404) {
            return <FetchResponseType<null>>{status: 404, message: "Ainda não existe clientes cadastrados no banco"}
        }
        console.log(result.message)
        return null
    } catch (err) {
        console.log(err)
    }
}

export const getCliente = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${id}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: "include",
            cache: "no-store"
        })
        const result: FetchResponseType<ClienteResponseType> = await res.json()

        if (result.status == 200) {
            return result
        }
        if (result.status == 404) {
            toast.error(result.message)
            return null
        }
        console.log(result.message)
        return null
    } catch (err) {
        console.log(err)
    }
}
export const deleteCliente = async (id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            cache: "no-store"
        })
        const result = await res.json()

        if (result.status == 200) {
            return result
        }
        if (result.status == 404) {
            toast.error(result.message)
            return null
        }
        console.log(result.message)
        return null
    } catch (err) {
        console.log(err)
    }
}
