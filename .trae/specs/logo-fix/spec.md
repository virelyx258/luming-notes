# Logo Fix - Product Requirement Document

## Overview

- **Summary**: 修改顶栏左上角的图标显示逻辑，使其使用 config.json 中设置的 site.favicon 而不是硬编码的 author.avatar。
- **Purpose**: 确保顶栏图标与站点配置保持一致，提升用户体验和品牌一致性。
- **Target Users**: 网站访问者和管理员。

## Goals

- 修改顶栏图标显示逻辑，使用 site.favicon 配置
- 保持原有的动画效果和交互行为
- 确保在移动设备和桌面设备上都正确显示

## Non-Goals (Out of Scope)

- 不修改其他组件的功能
- 不添加新的功能或样式
- 不修改配置文件的结构

## Background & Context

- 当前顶栏图标硬编码使用 author.avatar 作为图片源
- 配置文件中已存在 site.favicon 配置项，但未被顶栏图标使用
- 需要修改 AnimatedLogo.tsx 组件中的 Logo 函数实现

## Functional Requirements

- **FR-1**: 顶栏图标应使用 config.json 中的 site.favicon 配置
- **FR-2**: 保持原有的动画效果和交互行为
- **FR-3**: 确保在移动设备和桌面设备上都正确显示

## Non-Functional Requirements

- **NFR-1**: 修改应最小化，仅更改必要的代码
- **NFR-2**: 应保持代码风格和质量与现有代码一致

## Constraints

- **Technical**: 使用现有的技术栈和依赖
- **Dependencies**: 依赖 config.json 中的 site.favicon 配置

## Assumptions

- config.json 中的 site.favicon 配置为有效的图片 URL
- 现有的动画效果和交互逻辑应保持不变

## Acceptance Criteria

### AC-1: 顶栏图标显示 site.favicon

- **Given**: 配置文件中设置了 site.favicon
- **When**: 访问网站
- **Then**: 顶栏左上角显示 site.favicon 图片
- **Verification**: `human-judgment`

### AC-2: 动画效果保持不变

- **Given**: 顶栏图标已修改为使用 site.favicon
- **When**: 在移动设备和桌面设备之间切换
- **Then**: 顶栏图标仍具有原有的动画效果
- **Verification**: `human-judgment`

### AC-3: 响应式显示正常

- **Given**: 顶栏图标已修改为使用 site.favicon
- **When**: 在不同屏幕尺寸下访问网站
- **Then**: 顶栏图标在所有设备上都正确显示
- **Verification**: `human-judgment`

## Open Questions

- [ ] 无
