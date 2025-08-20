import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.redirect(new URL("mailto:reesud6187@gmail.com?subject=Re%3A%20Website%20Inquiry"))
}