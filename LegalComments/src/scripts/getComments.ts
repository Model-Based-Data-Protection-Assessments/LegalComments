import { IssueFetcher } from '@/model/Fetching'

export async function main(): Promise<string> {
  const fetcher = new IssueFetcher()
  const comments = await fetcher.fetch()
  const json = JSON.stringify(comments)
  return json
}
