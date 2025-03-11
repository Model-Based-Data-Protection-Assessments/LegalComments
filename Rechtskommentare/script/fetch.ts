import { IssueFetcher } from '../src/model/Fetching'
import { writeFile } from 'fs'

async function main() {
  const fetcher = new IssueFetcher()
  fetcher
    .fetch()
    .then((comments) => writeFile('public/comments.json', JSON.stringify(comments), () => {}))
}

void main()
