# 俱乐部详情页需求

## 功能概述
点击俱乐部卡片后打开详情弹窗，展示俱乐部完整信息。

## 详情页结构

### 1. 顶部区域
- 俱乐部Logo（圆形，带发光边框）
- 俱乐部名称（大字体，战术绿强调色）
- 抖音短链接（可点击跳转，格式如 `https://v.douyin.com/xxx/`）
- 认证标识（如有）

### 2. 中部区域 - 陪玩项目价格表
清晰展示各类型陪玩服务及价格：

| 服务类型 | 价格说明 |
|---------|---------|
| 基础护航 | XX元/局 或 XX元/小时 |
| 跑刀护航 | XX元/局 |
| 代肝服务 | XX元/天 或 XX元/周 |
| 其他定制 | 根据需求报价 |

价格表采用表格或卡片形式，清晰易读。

### 3. 底部区域
- 立即下单按钮（大按钮，战术绿渐变，带hover发光效果）
- 点击跳转到官方下单链接

## 数据结构要求

每个俱乐部需包含以下字段：
```javascript
{
  id: string,
  name: string,
  logo: string,
  fans: number,
  orders: number,
  rating: number,
  price: number, // 基础价格
  tags: string[],
  verified: boolean,
  // 新增字段
  douyinUrl: string, // 抖音短链接，如 https://v.douyin.com/xxx/
  orderUrl: string,  // 官方下单链接
  services: [        // 陪玩服务价格列表
    {
      type: '基础护航',
      price: '30元/局',
      description: '专业陪玩，全程护航'
    },
    {
      type: '跑刀护航',
      price: '50元/局',
      description: '高端装备，稳稳吃鸡'
    },
    {
      type: '代肝服务',
      price: '200元/周',
      description: '日常任务、等级提升'
    }
  ]
}
```

## 设计风格
- 保持现有军事科技风格
- 深色背景 + 战术绿强调色
- 网格纹理、扫描线动效
- 卡片采用毛玻璃效果
- 按钮带发光hover效果
- 完美适配移动端（弹窗全屏或90%屏幕高度）