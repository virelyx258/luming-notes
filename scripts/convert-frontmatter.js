import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const POSTS_DIRS = ['src/content/posts/2024', 'src/content/posts/2025', 'src/content/posts/2026']

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const frontmatterStr = match[1]
  const body = content.slice(match[0].length)
  return { frontmatterStr, body }
}

function parseYamlSimple(yamlStr) {
  const result = {}
  const lines = yamlStr.split('\n')
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue
    const key = line.slice(0, colonIndex).trim()
    let value = line.slice(colonIndex + 1).trim()
    result[key] = value
  }
  return result
}

function parsePublishedDateTime(publishedStr) {
  if (!publishedStr) return { date: null, lastMod: null }
  const match = publishedStr.match(/^(\d{4}-\d{2}-\d{2})(?:\s+(\d{2}:\d{2}:\d{2}))?/)
  if (!match) return { date: null, lastMod: null }
  const datePart = match[1]
  const timePart = match[2] || '00:00:00'
  const isoStr = `${datePart}T${timePart}.000Z`
  return { date: isoStr, lastMod: isoStr }
}

function parseTags(tagsStr) {
  if (!tagsStr) return []
  const match = tagsStr.match(/\[(.*)\]/)
  if (!match) return []
  const inner = match[1]
  const tags = inner
    .split(',')
    .map((tag) => {
      return tag.trim().replace(/^['"]|['"]$/g, '')
    })
    .filter((tag) => tag.length > 0)
  return tags
}

function parseCategory(categoryStr) {
  if (!categoryStr) return ''
  return categoryStr.trim().replace(/^['"]|['"]$/g, '')
}

function buildNewFrontmatter(oldFm) {
  const { date, lastMod } = parsePublishedDateTime(oldFm.published)
  const tags = parseTags(oldFm.tags)
  const category = parseCategory(oldFm.category)
  const summary = (oldFm.description || '').replace(/^['"]|['"]$/g, '')
  const title = oldFm.title || ''
  const lines = []
  lines.push('---')
  lines.push(`title: ${title}`)
  if (date) lines.push(`date: ${date}`)
  if (lastMod) lines.push(`lastMod: ${lastMod}`)
  if (tags.length > 0) {
    lines.push(`tags: [${tags.join(', ')}]`)
  } else {
    lines.push('tags: []')
  }
  lines.push(`category: ${category}`)
  lines.push(`summary: '${summary}'`)
  lines.push('---')
  return lines.join('\n')
}

function convertFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const parsed = parseFrontmatter(content)
  if (!parsed) {
    return { success: false, reason: 'no frontmatter' }
  }
  const { frontmatterStr, body } = parsed
  const oldFm = parseYamlSimple(frontmatterStr)

  if (oldFm.date && !oldFm.published) {
    return { success: false, reason: 'already converted' }
  }

  const newFm = buildNewFrontmatter(oldFm)
  const newContent = newFm + body
  fs.writeFileSync(filePath, newContent, 'utf-8')
  return { success: true }
}

function walkDir(dir, mdFiles) {
  if (!fs.existsSync(dir)) return
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkDir(fullPath, mdFiles)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      mdFiles.push(fullPath)
    }
  }
}

function main() {
  const rootDir = path.resolve(__dirname, '..')
  let totalFiles = 0
  let successCount = 0
  let skipCount = 0
  let failCount = 0
  const failedFiles = []
  for (const relDir of POSTS_DIRS) {
    const absDir = path.join(rootDir, relDir)
    const mdFiles = []
    walkDir(absDir, mdFiles)
    for (const filePath of mdFiles) {
      totalFiles++
      const result = convertFile(filePath)
      if (result.success) {
        successCount++
        console.log(`[OK] ${path.relative(rootDir, filePath)}`)
      } else if (result.reason === 'already converted') {
        skipCount++
        console.log(`[SKIP] ${path.relative(rootDir, filePath)}: already converted`)
      } else {
        failCount++
        failedFiles.push({ path: filePath, reason: result.reason })
        console.log(`[FAIL] ${path.relative(rootDir, filePath)}: ${result.reason}`)
      }
    }
  }
  console.log('\n========== 转换统计 ==========')
  console.log(`总文件数: ${totalFiles}`)
  console.log(`成功: ${successCount}`)
  console.log(`跳过: ${skipCount}`)
  console.log(`失败: ${failCount}`)
  if (failedFiles.length > 0) {
    console.log('\n失败文件列表:')
    for (const f of failedFiles) {
      console.log(`  - ${path.relative(rootDir, f.path)} (${f.reason})`)
    }
  }
}

main()
