import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        picture: {
            type: String,
        },
        files: [
            {
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
                name: {
                    type: String,
                },
                content: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
