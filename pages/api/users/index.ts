import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/users'

// Load Default Data
import DATA from '../../../json/data.json'
const defaultData = DATA

export default async function handler(req: any, res: any) {
    const { id, name, email, picture } = req.body

    await dbConnect()

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            try {
                const newUser = await User.create({
                    _id: id,
                    name: name,
                    email: email,
                    picture: picture,
                    files: [
                        {
                            name: 'welcome.md',
                            content:
                                "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
                        },

                        {
                            name: 'untitled-document.md',
                            content: '# EDIT ME!!',
                        },
                    ],
                })
                res.status(200).json({ success: true, data: newUser })
            } catch (error) {
                res.status(400).json({ success: false })
            }
        }
        res.status(200).json({ success: true, data: user })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}