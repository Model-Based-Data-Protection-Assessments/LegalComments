import { main } from './legalcomments.js'
import { writeFile } from 'fs'

async function run() {
  const comments = await main()
  writeFile('public/data.json', comments, () => {})
}

void run()
