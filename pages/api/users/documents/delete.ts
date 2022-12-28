import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/users'

export default async function handler(req: any, res: any) {
    const { id, mdxID } = req.body

    await dbConnect()

    try {
        const document = await User.findByIdAndUpdate(
            { _id: id },
            {
                $pull: {
                    files: {
                        _id: mdxID,
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
