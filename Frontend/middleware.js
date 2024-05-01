import { NextResponse } from "next/server";

export default async function middleware(req) {
    let verify = req.cookies.get("token");
    let url = req.url
    const domain = process.env.NEXT_PUBLIC_URL_DEV;

    if (!verify && url.includes('/admin')) {
        return NextResponse.redirect(domain + `/auth/login`);
    }

    if (verify && url === domain + `/auth/login`) {
        return NextResponse.redirect(domain + `/admin/dashboard`);
    }
}
