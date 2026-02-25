# Frontmatter Migration Spec

## Why

当前文章的 frontmatter 格式包含 `published`、`description`、`image`、`draft`、`lang` 等字段，用户希望简化为新格式，使用 `date`、`lastMod`、`tags`、`category`、`summary` 字段，并移除封面（image）字段。

## What Changes

- 将 `published` 字段转换为 `date` 字段（格式：YYYY-MM-DD）
- 添加 `lastMod` 字段（如果原文件有修改时间信息则使用，否则使用原 published 时间）
- 保留 `tags` 字段，格式保持为 `[tag1, tag2]`
- 保留 `category` 字段
- 将 `description` 字段转换为 `summary` 字段
- **BREAKING**: 移除 `image` 字段（封面）
- 移除 `draft` 字段
- 移除 `lang` 字段

## Impact

- Affected specs: 文章内容管理
- Affected code: `src/content/posts/2024/`, `src/content/posts/2025/`, `src/content/posts/2026/` 下的所有 `.md` 文件

## ADDED Requirements

### Requirement: Frontmatter 格式转换

系统 SHALL 将文章的 frontmatter 从旧格式转换为新格式。

#### Scenario: 标准文章转换

- **WHEN** 文章包含旧格式 frontmatter
- **THEN** 转换为新格式：
  ```yaml
  title: 文章标题
  date: YYYY-MM-DD
  lastMod: ISO8601时间戳
  tags: [tag1, tag2]
  category: 分类名
  summary: 文章摘要
  ```

#### Scenario: 空字段处理

- **WHEN** 原字段为空（如 description 为空）
- **THEN** summary 字段保留为空字符串

#### Scenario: 标签格式

- **WHEN** tags 字段存在
- **THEN** 保持数组格式 `[tag1, tag2]`

## MODIFIED Requirements

无

## REMOVED Requirements

### Requirement: 封面图片字段

**Reason**: 用户要求移除封面功能
**Migration**: 直接删除 `image` 字段，不保留任何封面信息

### Requirement: 草稿状态字段

**Reason**: 新格式不需要
**Migration**: 直接删除 `draft` 字段

### Requirement: 语言字段

**Reason**: 新格式不需要
**Migration**: 直接删除 `lang` 字段
