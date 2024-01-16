import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/users'

export async function PUT(req: Request) {
    const { id, content, name } = await req.json()

    await dbConnect()

    try {
        const document = await User.findOneAndUpdate(
            { 'files._id': id },
            {
                $set: { 'files.$.name': name, 'files.$.content': content },
            },
            {
                returnDocument: 'after',
            }
        )
        return NextResponse.json(
            { success: true, data: document },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false }, { status: 400 })
    }
}
