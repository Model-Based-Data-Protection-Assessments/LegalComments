import type { Comment } from '.'
import { apiUrl, label, parseCommentFromText, repositoryName, repositoryOwner } from './Parsing'

interface Issue {
  id: number
  body: string
}

export abstract class Fetcher {
  public abstract fetch(): Promise<Comment[]>
}

export class JsonFetcher extends Fetcher {
  constructor(private readonly url: string) {
    super()
  }

  public async fetch(): Promise<Comment[]> {
    const response = await fetch(this.url)
    const json = await response.json()
    return json as Comment[]
  }
}

export class IssueFetcher extends Fetcher {
  private static readonly ISSUES_PER_SITE = 100

  public async fetch(): Promise<Comment[]> {
    const issues = await this.getAllIssues()
    return issues.map((issue: Issue) => parseCommentFromText(issue.body, issue.id))
  }

  private async getAllIssues(): Promise<Issue[]> {
    let lastFetchedCount = 0
    let pageIndex = 0
    const issues: Issue[] = []
    do {
      const json = (await fetch(
        `${apiUrl}/repos/${repositoryOwner}/${repositoryName}/issues?labels=${label}&state=open&per_page=${IssueFetcher.ISSUES_PER_SITE}&page=${pageIndex}`
      ).then((r) => r.json())) as Issue[]

      lastFetchedCount = json.length

      issues.push(...json)

      pageIndex++
    } while (lastFetchedCount >= IssueFetcher.ISSUES_PER_SITE)
    return issues
  }
}

export async function getLargestIssueNumber() {
  const url = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/issues?state=all&per_page=1&sort=number&direction=desc`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const issues = await response.json()
    if (issues.length === 0) {
      console.warn('No issues found.')
      return 0
    }

    return issues[0].number
  } catch (error) {
    console.error('Error fetching issues:', error)
    return null
  }
}
