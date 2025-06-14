// src/app/core/services/news/news.mock.ts

import { NewsArticle, NewsCategory, NewsLayout } from '../../models/news.model';

export const MOCK_NEWS_CATEGORIES: NewsCategory[] = [
  {
    slug: 'premier-league',
    name: 'พรีเมียร์ลีก',
    style: NewsLayout.MAGAZINE,
    articles: [
      {
        id: '1',
        title: 'แมนซิตี้คว้าแชมป์พรีเมียร์ลีก',
        shortDescription:
          'แมนซิตี้คว้าแชมป์พรีเมียร์ลีกเป็นสมัยที่ 4 ติดต่อกัน',
        imageUrl: 'https://www.siamsport.co.th/static/83006/856x452.webp',
        date: '2024-05-19',
        category: 'พรีเมียร์ลีก',
      },
      {
        id: 'pl-2',
        title: 'เชลซีเปิดบ้านถล่มอาร์เซนอล 4-0',
        shortDescription: 'สิงห์บลูฟอร์มดุในบ้าน...',
        imageUrl: 'https://www.siamsport.co.th/static/83006/856x452.webp',
        date: '2024-07-28',
        category: 'premier-league',
      },
      {
        id: 'pl-3',
        title: 'แมนฯ ซิตี้ คว้าแชมป์คาราบาวคัพ',
        shortDescription: 'เรือใบสีฟ้ายังคงแข็งแกร่ง...',
        imageUrl: 'https://www.siamsport.co.th/static/83006/856x452.webp',
        date: '2024-07-27',
        category: 'premier-league',
      },
    ],
  },
  {
    slug: 'la-liga',
    name: 'ลาลีกา',
    style: NewsLayout.LIST,
    articles: [
      {
        id: '2',
        title: 'เรอัล มาดริด คว้าแชมป์ลาลีกา',
        shortDescription: 'เรอัล มาดริด คว้าแชมป์ลาลีกาเป็นสมัยที่ 36',
        imageUrl: 'https://www.siamsport.co.th/static/83006/856x452.webp',
        date: '2024-05-15',
        category: 'ลาลีกา',
      },
      {
        id: 'll-2',
        title: 'เรอัล มาดริด บุกชนะเซบีย่า 2-0',
        shortDescription: 'ราชันชุดขาวโชว์ฟอร์มแกร่ง...',
        imageUrl: 'https://www.siamsport.co.th/static/83006/856x452.webp',
        date: '2024-07-28',
        category: 'la-liga',
      },
    ],
  },
  {
    slug: 'thai-league',
    name: 'ไทยลีก',
    style: NewsLayout.MAGAZINE,
    articles: [
      {
        id: 'tl-1',
        title: 'บุรีรัมย์ ยูไนเต็ด คว้าแชมป์ไทยลีกสมัยที่ 9',
        shortDescription: 'ปราสาทสายฟ้าสร้างประวัติศาสตร์...',
        imageUrl: 'https://www.siamsport.co.th/static/83006/856x452.webp',
        date: '2024-07-29',
        category: 'thai-league',
      },
      {
        id: 'tl-2',
        title: 'การท่าเรือ เอฟซี เปิดตัวนักเตะใหม่',
        shortDescription: 'สิงห์เจ้าท่าเสริมทัพดุ...',
        imageUrl: 'https://www.siamsport.co.th/static/83006/856x452.webp',
        date: '2024-07-28',
        category: 'thai-league',
      },
    ],
  },
  {
    slug: 'serie-a',
    name: 'เซเรีย อา',
    style: NewsLayout.MAGAZINE,
    articles: [
      {
        id: '3',
        title: 'อินเตอร์ มิลาน คว้าแชมป์เซเรีย อา',
        shortDescription: 'อินเตอร์ มิลาน คว้าแชมป์เซเรีย อาเป็นสมัยที่ 20',
        imageUrl: 'https://www.siamsport.co.th/static/83006/856x452.webp',
        date: '2024-05-10',
        category: 'เซเรีย อา',
      },
    ],
  },
];
