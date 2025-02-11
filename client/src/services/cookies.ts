"use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export const setCookie = async (email: string) => {
    const cookieStore = cookies()

    const segredo = process.env.NEXT_PUBLIC_JWT_SECRET || ""
    const token = jwt.sign({ email }, segredo, { expiresIn: "1h" })
        ; (await cookieStore).set('token', token)
}