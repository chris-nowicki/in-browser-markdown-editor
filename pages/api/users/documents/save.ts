import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/users'

export default async function handler(req: any, res: any) {
    const { id, content, name } = req.body

    await dbConnect()

    try {
        const document = await User.updateOne(
            { 'files._id': id },
            {
                $set: { 'files.$.name': name, 'files.$.content': content },
            },
            {
                new: true,
            }
        )
        res.status(200).json({ success: true, data: document })
    } catch (error) {
        res.status(400).json({ success: false })
        console.log(error)
    }
}
