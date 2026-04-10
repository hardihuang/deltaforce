export interface Service {
  type: string;
  price: string;
  description: string;
}

export interface Club {
  id: string;
  name: string;
  avatar: string;
  description: string;
  fans: number;
  orders: number;
  rating: number;
  price: number;
  priceUnit: string;
  tags: string[];
  orderLink: string;
  createdAt: string;
  isVerified: boolean;
  // 新增字段 - 详情弹窗使用
  douyinUrl: string;
  orderUrl: string;
  services: Service[];
}

export type SortType = 'fans' | 'price' | 'orders' | 'rating';

export const sortOptions = [
  { value: 'fans' as SortType, label: '粉丝最多', icon: 'Users' },
  { value: 'price' as SortType, label: '性价比最高', icon: 'Wallet' },
  { value: 'orders' as SortType, label: '下单量最高', icon: 'ShoppingCart' },
  { value: 'rating' as SortType, label: '评价最好', icon: 'Star' },
] as const;

// Mock data for demo - simulating Feishu table data structure
export const mockClubs: Club[] = [
  {
    id: '1',
    name: '黑鹰特遣队',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=黑鹰&backgroundColor=1a1a2e&textColor=4ade80',
    description: '专业战术小队，人均KD3.0+，擅长攻防模式与撤离任务',
    fans: 15280,
    orders: 3420,
    rating: 4.9,
    price: 35,
    priceUnit: '局',
    tags: ['战术大师', 'KD3.0+', '24h在线'],
    orderLink: '#order-1',
    createdAt: '2024-01-15',
    isVerified: true,
    douyinUrl: 'https://v.douyin.com/i5P8Q2vK/',
    orderUrl: '#order-1',
    services: [
      { type: '基础护航', price: '35元/局', description: '专业打手全程护航，稳定撤离' },
      { type: '跑刀护航', price: '55元/局', description: '高级装备保障，高价值目标' },
      { type: '代肝服务', price: '150元/天', description: '日常任务、通行证等级' },
      { type: '定制服务', price: '面议', description: '特殊需求可协商' },
    ],
  },
  {
    id: '2',
    name: '沙漠之狐',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=沙漠&backgroundColor=2d1810&textColor=f97316',
    description: '老牌俱乐部，百余名王牌打手，千场实战经验',
    fans: 28950,
    orders: 8650,
    rating: 4.8,
    price: 28,
    priceUnit: '局',
    tags: ['老牌俱乐部', '经验丰富', '服务到位'],
    orderLink: '#order-2',
    createdAt: '2023-08-20',
    isVerified: true,
    douyinUrl: 'https://v.douyin.com/i5P9R3wL/',
    orderUrl: '#order-2',
    services: [
      { type: '基础护航', price: '28元/局', description: '资深打手，高效撤离' },
      { type: '跑刀护航', price: '45元/局', description: '专业跑刀，收益保障' },
      { type: '代肝服务', price: '120元/天', description: '日常任务、等级提升' },
      { type: '教学指导', price: '80元/小时', description: '一对一技巧指导' },
    ],
  },
  {
    id: '3',
    name: '幽灵行动组',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=幽灵&backgroundColor=0f172a&textColor=38bdf8',
    description: '隐蔽作战专家，潜行撤离成功率98%',
    fans: 9850,
    orders: 2150,
    rating: 4.9,
    price: 45,
    priceUnit: '局',
    tags: ['潜行专家', '隐蔽大师', '高成功率'],
    orderLink: '#order-3',
    createdAt: '2024-03-10',
    isVerified: true,
    douyinUrl: 'https://v.douyin.com/i5PA4xM/',
    orderUrl: '#order-3',
    services: [
      { type: '基础护航', price: '45元/局', description: '隐蔽渗透，安全撤离' },
      { type: '跑刀护航', price: '65元/局', description: '高价值目标专项' },
      { type: '代肝服务', price: '180元/天', description: '全包代练服务' },
      { type: '机密任务', price: '面议', description: '特殊行动需求' },
    ],
  },
  {
    id: '4',
    name: '雷霆突击队',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=雷霆&backgroundColor=450a0a&textColor=ef4444',
    description: '正面刚枪王者，支援火力压制专家',
    fans: 12400,
    orders: 4100,
    rating: 4.7,
    price: 32,
    priceUnit: '局',
    tags: ['刚枪王者', '火力压制', '团队配合'],
    orderLink: '#order-4',
    createdAt: '2024-02-05',
    isVerified: true,
    douyinUrl: 'https://v.douyin.com/i5PB5yN/',
    orderUrl: '#order-4',
    services: [
      { type: '基础护航', price: '32元/局', description: '火力压制，勇猛推进' },
      { type: '跑刀护航', price: '50元/局', description: '快速突进，清图服务' },
      { type: '代肝服务', price: '140元/天', description: '日常与通行证' },
      { type: '火力支援', price: '60元/局', description: '重装备护航' },
    ],
  },
  {
    id: '5',
    name: '猎鹰侦察连',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=猎鹰&backgroundColor=064e3b&textColor=34d399',
    description: '侦查与情报收集专家，地图控制能力强',
    fans: 7600,
    orders: 1850,
    rating: 4.8,
    price: 38,
    priceUnit: '局',
    tags: ['侦察专家', '地图控制', '信息优势'],
    orderLink: '#order-5',
    createdAt: '2024-04-01',
    isVerified: false,
    douyinUrl: 'https://v.douyin.com/i5PC6zO/',
    orderUrl: '#order-5',
    services: [
      { type: '基础护航', price: '38元/局', description: '情报先行，安全路线' },
      { type: '跑刀护航', price: '58元/局', description: '高价值物资定位' },
      { type: '代肝服务', price: '130元/天', description: '日常任务代做' },
    ],
  },
  {
    id: '6',
    name: '铁血狼群',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=狼群&backgroundColor=374151&textColor=fca5a5',
    description: '团队协作型俱乐部，配合默契度满分',
    fans: 18900,
    orders: 5200,
    rating: 4.6,
    price: 25,
    priceUnit: '局',
    tags: ['团队协作', '性价比高', '配合默契'],
    orderLink: '#order-6',
    createdAt: '2023-11-12',
    isVerified: true,
    douyinUrl: 'https://v.douyin.com/i5PD7aP/',
    orderUrl: '#order-6',
    services: [
      { type: '基础护航', price: '25元/局', description: '性价比首选，团队配合' },
      { type: '跑刀护航', price: '40元/局', description: '小投入大回报' },
      { type: '代肝服务', price: '100元/天', description: '经济实惠代练' },
      { type: '组队陪玩', price: '20元/局', description: '欢乐组排' },
    ],
  },
  {
    id: '7',
    name: '暗夜狙击手',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=狙击&backgroundColor=1e1b4b&textColor=a78bfa',
    description: '远距离精准打击，远程支援专家',
    fans: 5400,
    orders: 1200,
    rating: 4.9,
    price: 50,
    priceUnit: '局',
    tags: ['狙击专家', '远程支援', '精准打击'],
    orderLink: '#order-7',
    createdAt: '2024-05-20',
    isVerified: false,
    douyinUrl: 'https://v.douyin.com/i5PE8bQ/',
    orderUrl: '#order-7',
    services: [
      { type: '基础护航', price: '50元/局', description: '远程精准打击' },
      { type: '跑刀护航', price: '70元/局', description: '远距离架枪保护' },
      { type: '代肝服务', price: '200元/天', description: '专业狙击手代练' },
      { type: '狙击教学', price: '100元/小时', description: '精准射击技巧' },
    ],
  },
  {
    id: '8',
    name: '风暴机甲团',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=风暴&backgroundColor=0c4a6e&textColor=7dd3fc',
    description: '重型装备专家，火力与防护兼备',
    fans: 11200,
    orders: 2800,
    rating: 4.7,
    price: 40,
    priceUnit: '局',
    tags: ['重装备', '火力输出', '防护专家'],
    orderLink: '#order-8',
    createdAt: '2024-01-28',
    isVerified: true,
    douyinUrl: 'https://v.douyin.com/i5PF9cR/',
    orderUrl: '#order-8',
    services: [
      { type: '基础护航', price: '40元/局', description: '重装出击，火力全开' },
      { type: '跑刀护航', price: '60元/局', description: '装备碾压，稳赚不赔' },
      { type: '代肝服务', price: '160元/天', description: '重型装备解锁' },
      { type: '装备出租', price: '30元/局', description: '高级装备体验' },
    ],
  },
  {
    id: '9',
    name: '利刃特战队',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=利刃&backgroundColor=7f1d1d&textColor=fca5a5',
    description: '快速突进型打法，闪电战专家',
    fans: 6800,
    orders: 1500,
    rating: 4.5,
    price: 30,
    priceUnit: '局',
    tags: ['快速突进', '闪电战', '节奏快'],
    orderLink: '#order-9',
    createdAt: '2024-06-01',
    isVerified: false,
    douyinUrl: 'https://v.douyin.com/i5PG0dS/',
    orderUrl: '#order-9',
    services: [
      { type: '基础护航', price: '30元/局', description: '快速突进，速战速决' },
      { type: '跑刀护航', price: '48元/局', description: '闪电跑刀，快速撤离' },
      { type: '代肝服务', price: '110元/天', description: '效率优先代练' },
    ],
  },
  {
    id: '10',
    name: '北极星联盟',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=北极星&backgroundColor=1e3a5f&textColor=93c5fd',
    description: '综合型俱乐部，多种战术风格灵活切换',
    fans: 22100,
    orders: 6800,
    rating: 4.8,
    price: 33,
    priceUnit: '局',
    tags: ['全能型', '战术多变', '适应性强'],
    orderLink: '#order-10',
    createdAt: '2023-09-15',
    isVerified: true,
    douyinUrl: 'https://v.douyin.com/i5PH1eT/',
    orderUrl: '#order-10',
    services: [
      { type: '基础护航', price: '33元/局', description: '全能型打手，随机应变' },
      { type: '跑刀护航', price: '52元/局', description: '灵活战术，稳赚撤离' },
      { type: '代肝服务', price: '135元/天', description: '全方位代练服务' },
      { type: '战术指导', price: '90元/小时', description: '战术思维培养' },
    ],
  },
];

// Simulates async fetch from Feishu table
export async function fetchClubs(): Promise<Club[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockClubs;
}
