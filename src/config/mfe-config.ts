import type { CoreConfig } from '@your-org/core';

export const mfeConfig: CoreConfig = {
  tabs: {
    home: 'Trang chủ',
    products: 'Sản phẩm',
  },
  home: {
    headerTitle: 'Trang chủ',
    title: 'Ứng dụng của tôi',
    subtitle: 'Cài @your-org/core — customize qua CoreProvider.',
    buttonLabel: 'Bắt đầu ngay',
    onAction: () => alert('Home action từ consumer app!'),
  },
  products: {
    headerTitle: 'Sản phẩm',
    title: 'Danh mục sản phẩm',
    subtitle: 'Dữ liệu và labels được override từ consumer repo.',
    currency: 'VND',
    products: [
      {
        id: '1',
        name: 'Gói Basic',
        price: 99000,
        description: 'Gói cơ bản cho startup',
      },
      {
        id: '2',
        name: 'Gói Pro',
        price: 299000,
        description: 'Đầy đủ tính năng',
      },
      {
        id: '3',
        name: 'Gói Enterprise',
        price: 999000,
        description: 'Hỗ trợ 24/7 + SLA',
      },
    ],
    onProductSelect: (product) => alert(`Đã chọn: ${product.name}`),
  },
};
