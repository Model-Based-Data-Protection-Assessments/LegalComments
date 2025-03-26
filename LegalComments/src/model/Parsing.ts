import type { Link, Comment } from '.'

abstract class ElementParser<T> {
  constructor(
    private readonly id: string,
    protected readonly heading?: string
  ) {}

  public parse(text: string): T {
    let section = this.getSection(text).trim()
    if (this.heading) {
      section = section.replace(this.buildHeading(), '')
    }

    return this.parseContent(section)
  }

  protected abstract parseContent(text: string): T

  private getSection(text: string): string {
    const regExp = new RegExp(
      `${this.buildStartIndicator()}\n((?:.|\n)*)\n${this.buildEndIndicator()}`,
      'gm'
    )
    const match = regExp.exec(text)
    if (!match) {
      return ''
    }
    return match[1]
  }

  public build(v: T): string {
    let text = this.buildStartIndicator() + '\n'
    if (this.heading) {
      text += this.buildHeading()
    }
    text += this.buildContent(v) + '\n'
    text += this.buildEndIndicator()
    return text
  }

  protected abstract buildContent(v: T): string

  private buildStartIndicator(): string {
    return `<!--${this.id}-->`
  }

  private buildEndIndicator(): string {
    return `<!--/${this.id}-->`
  }

  private buildHeading(): string {
    return this.heading ? `## ${this.heading}\n` : ''
  }
}

class LinkParser extends ElementParser<Link[]> {
  constructor(id: string, heading?: string) {
    super(id, heading)
  }

  protected parseContent(text: string): Link[] {
    const regexp = /\[(.*)\]\((.*)\)/gm
    let match: RegExpExecArray | null = regexp.exec(text)
    const links: Link[] = []
    while (match !== null) {
      links.push({
        text: match[1],
        to: match[2]
      })
      match = regexp.exec(text)
    }
    return links
  }

  protected buildContent(v: Link[]): string {
    return v.map((l) => `[${l.text}](${l.to})`).join('\n')
  }
}

class PlainTextParser extends ElementParser<string> {
  constructor(id: string, heading?: string) {
    super(id, heading)
  }

  protected parseContent(text: string): string {
    return text
  }

  protected buildContent(v: string): string {
    return v
  }
}

class RelatedCommentListParser extends ElementParser<number[]> {
  constructor(id: string) {
    super(id, 'Related Comments')
  }

  protected parseContent(text: string): number[] {
    const regexp = /#([0-9]+)/gm
    let match: RegExpExecArray | null = regexp.exec(text)
    const relatedComments: number[] = []
    while (match !== null) {
      relatedComments.push(parseInt(match[1]))
      match = regexp.exec(text)
    }
    return relatedComments
  }

  protected buildContent(v: number[]): string {
    return v.map((c) => `#${c}`).join(', ')
  }
}

class MainHeadingParser extends ElementParser<string> {
  constructor(id: string) {
    super(id)
  }

  protected parseContent(text: string): string {
    const r = /# (.*)/.exec(text)
    return r ? r[1].trim() : ''
  }

  protected buildContent(v: string): string {
    return `# ${v}`
  }
}

const legalTermParser = new MainHeadingParser('name')
const usedInParser = new LinkParser('usedIn', 'Used In')
const descriptionParser = new PlainTextParser('description')
const relatedCommentsParser = new RelatedCommentListParser('relatedComments')
const basedOnParser = new LinkParser('basedOn', 'Based On')
const referencesParser = new LinkParser('references', 'References')
const constraintParser = new PlainTextParser('constraint', 'Constraint')

function parseCommentFromText(text: string, id: number): Comment {
  return {
    id,
    legalTerm: legalTermParser.parse(text),
    usedIn: usedInParser.parse(text),
    description: descriptionParser.parse(text),
    relatedComments: relatedCommentsParser.parse(text),
    basedOn: basedOnParser.parse(text),
    references: referencesParser.parse(text),
    constraint: constraintParser.parse(text)
  }
}

function buildCommentToText(comment: Comment) {
  let text = legalTermParser.build(comment.legalTerm)
  if (comment.usedIn.length > 0) {
    text += '\n' + usedInParser.build(comment.usedIn)
  }
  if (comment.description !== '') {
    text += '\n' + descriptionParser.build(comment.description)
  }
  if (comment.relatedComments.length > 0) {
    text += '\n' + relatedCommentsParser.build(comment.relatedComments)
  }
  if (comment.basedOn.length > 0) {
    text += '\n' + basedOnParser.build(comment.basedOn)
  }
  if (comment.references.length > 0) {
    text += '\n' + referencesParser.build(comment.references)
  }
  if (comment.constraint !== '') {
    text += '\n' + constraintParser.build(comment.constraint)
  }
  return text
}

const gitHubUrl = 'https://github.com'
const apiUrl = 'https://api.github.com'
const repositoryOwner = 'Model-Based-Data-Protection-Assessments'
const repositoryName = 'LegalComments'
const label = 'comment'

export {
  parseCommentFromText,
  buildCommentToText,
  gitHubUrl,
  repositoryOwner,
  repositoryName,
  label,
  apiUrl
}
