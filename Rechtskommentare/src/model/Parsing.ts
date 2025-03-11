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
    const startRegexp = new RegExp(`${this.buildStartIndicator()}(.)`, 'gm')
    const endRegexp = new RegExp(`(.)${this.buildEndIndicator()}`, 'gm')
    const startMatch = startRegexp.exec(text)
    const startText = startMatch ? startMatch[1] : ''
    const endMatch = endRegexp.exec(startText)
    const endText = endMatch ? endMatch[1] : ''
    return endText
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

class MainHeadingParser extends ElementParser<string> {
  constructor(id: string) {
    super(id)
  }

  protected parseContent(text: string): string {
    const r = /# (.)/.exec(text)
    return r ? r[1].trim() : ''
  }

  protected buildContent(v: string): string {
    return `# ${v}`
  }
}

const nameParser = new MainHeadingParser('name')
const descriptionParser = new PlainTextParser('description')
const legalNormParser = new LinkParser('legalNorm', 'Legal Norms')
const referencesParser = new LinkParser('references', 'References')
const constraintParser = new PlainTextParser('constraint', 'Constraint')

function parseCommentFromText(text: string, id: number) {
  return {
    id,
    name: nameParser.parse(text),
    description: descriptionParser.parse(text),
    legalNorm: legalNormParser.parse(text),
    references: referencesParser.parse(text),
    constraint: constraintParser.parse(text)
  }
}

function buildCommentToText(comment: Comment) {
  let text = nameParser.build(comment.name)
  if (comment.description !== '') {
    text += '\n' + descriptionParser.build(comment.description)
  }
  if (comment.legalNorm.length > 0) {
    text += '\n' + legalNormParser.build(comment.legalNorm)
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
