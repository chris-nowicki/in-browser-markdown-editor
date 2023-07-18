import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/users'

export async function POST(req: Request) {
	const { id, name, email, picture } = await req.json()

	await dbConnect()

	try {
		const user = await User.findOne({ email: email })
		
		// if user is not found then create the user
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
								"# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, tables, lists, and task lists.\n- Name and save the document, **if logged in**, to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Font Styling\n\n- To italicize text, wrap the text in single stars (*) *like this*.\n- To bold text, wrap the text in double stars (**) **like this**.\n\n###### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```\n\n###### Tables\n\n| Heading 1 | Heading 2 |\n| --------- | --------- |\n|   cell 1  |   cell 2  |\n\n###### Task List\n\n- [ ] This is Task #1\n- [ ] This is Task #2\n- [X] This is Task #3 and is marked complete!",
						},

						{
							name: 'untitled-document.md',
							content: '# EDIT ME!!',
						},
					],
				})
				return NextResponse.json({ success: true, data: newUser }, { status: 200 })
			} catch (error) {
				return NextResponse.json({ success: false }, { status: 400 })
			}
		}
		return NextResponse.json({ success: true, data: user }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ success: false }, { status: 400 })
	}
}
