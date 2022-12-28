import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/users'

export default async function handler(req: any, res: any) {
    const { id } = req.body

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
        res.status(200).json({ success: true, data: document })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
