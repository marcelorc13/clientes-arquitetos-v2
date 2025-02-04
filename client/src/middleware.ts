import { NextRequest, NextResponse } from "next/server"

export const middleware = (req: NextRequest) => {
    const urlAtual = req.nextUrl.pathname

    const cookie = req.cookies.get('token')
    const token: string = cookie?.value || ''

    if(token && urlAtual == '/') {
        return NextResponse.redirect(new URL('/clientes', req.url))
    }

    if (token) {
        return NextResponse.next()
    }
    if (!token && urlAtual == '/') {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/", req.url))

}

export const config = {
    matcher: ['/', '/clientes', '/clientes/:path', '/cadastro-cliente']
}