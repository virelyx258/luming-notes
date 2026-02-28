# Twikoo 深色模式适配 Spec

## Why

当前 Twikoo 样式在深色模式下仍然显示浅色样式（深色背景使用浅色、浅色文字等），没有正确适配博客的深色模式。需要让 Twikoo 在深色模式下使用深色背景、浅色文字，与博客整体风格保持一致。

## What Changes

- 重写 Twikoo CSS 样式，使用博客现有的 CSS 变量系统
- 在深色模式下使用 `--color-bg-primary`、`--color-text-primary` 等变量
- 移除硬编码的颜色值，改用动态变量

## Impact

- Affected specs: 评论系统样式
- Affected code: `src/styles/twikoo.css`

## ADDED Requirements

### Requirement: 使用博客 CSS 变量系统

Twikoo 样式 SHALL 使用博客定义的 CSS 变量，而非硬编码颜色值。

#### Scenario: 亮色模式

- **WHEN** 博客处于亮色模式
- **THEN** Twikoo 使用浅色背景、深色文字

#### Scenario: 深色模式

- **WHEN** 博客处于深色模式（`html.dark`）
- **THEN** Twikoo 使用深色背景、浅色文字

### Requirement: 正确的变量映射

Twikoo 样式 SHALL 正确映射博客变量：

| Twikoo 元素 | 使用的变量                                    |
| ----------- | --------------------------------------------- |
| 文字颜色    | `--color-text-primary`                        |
| 次要文字    | `--color-text-secondary`                      |
| 背景色      | `--color-bg-primary` / `--color-bg-secondary` |
| 边框色      | `--color-border-primary`                      |
| 强调色      | `--color-accent`                              |

## MODIFIED Requirements

无

## REMOVED Requirements

### Requirement: 硬编码颜色值

**Reason**: 硬编码的颜色值无法响应主题切换
**Migration**: 使用 CSS 变量替代所有硬编码颜色
