import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/users'

export async function PUT(req: Request) {
	const { id } = await req.json()

	await dbConnect()

	try {
		const document = await User.findByIdAndUpdate(
			{ _id: id },
			{
				$push: {
					files: {
						$each: [
							{
								name: 'untitled-document.md',
								content: '# EDIT ME!',
							},
						],
						$position: 0,
					},
				},
			},
			{
				new: true,
			}
		)
		return NextResponse.json({ success: true, data: document }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ success: false }, { status: 400 })
	}
}