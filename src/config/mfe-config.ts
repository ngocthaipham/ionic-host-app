import type { HomeMfeConfig } from '@your-org/mfe-home';
import type { ProductsMfeConfig } from '@your-org/mfe-products';

export const mfeConfig: {
  home: HomeMfeConfig;
  products: ProductsMfeConfig;
} = {
  home: {
    headerTitle: 'Trang chủ',
    title: 'Ứng dụng của tôi',
    subtitle: 'Micro-frontend cài từ npm package — customize qua config.',
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
