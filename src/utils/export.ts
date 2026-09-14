import { Order, Customer, MenuItem, Reservation, Coupon } from '../context/AppContext';

export function exportToExcel(data: any[], filename: string, headers?: string[]) {
  if (data.length === 0) return;
  
  const cols = headers || Object.keys(data[0]);
  const csvRows: string[] = [];
  
  // Add BOM for UTF-8
  csvRows.push('\uFEFF');
  
  // Headers
  csvRows.push(cols.map(col => `"${col}"`).join(','));
  
  // Data rows
  data.forEach(row => {
    const values = cols.map(col => {
      const val = row[col];
      if (val === null || val === undefined) return '';
      const strVal = String(val).replace(/"/g, '""');
      return `"${strVal}"`;
    });
    csvRows.push(values.join(','));
  });
  
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportOrdersToExcel(orders: Order[]) {
  const data = orders.map(o => ({
    'شماره سفارش': o.id,
    'مشتری': o.customer,
    'آیتم‌ها': o.items,
    'مبلغ (تومان)': o.total,
    'وضعیت': o.status,
    'نوع': o.type === 'delivery' ? 'ارسال' : o.type === 'pickup' ? 'بیرون‌بر' : 'حضوری',
    'زمان': o.time,
    'آدرس': o.address || '-',
    'تلفن': o.phone || '-',
  }));
  exportToExcel(data, `سفارش‌ها-${new Date().toLocaleDateString('fa-IR')}`);
}

export function exportCustomersToExcel(customers: Customer[]) {
  const data = customers.map(c => ({
    'نام': c.name,
    'تلفن': c.phone,
    'تعداد سفارش': c.orders,
    'مجموع خرید (تومان)': c.spent,
    'امتیاز': c.points,
    'سطح': c.tier,
    'تاریخ عضویت': c.joinedAt,
  }));
  exportToExcel(data, `مشتریان-${new Date().toLocaleDateString('fa-IR')}`);
}

export function exportMenuToExcel(items: MenuItem[]) {
  const data = items.map(i => ({
    'نام': i.name,
    'توضیحات': i.desc,
    'قیمت (تومان)': i.price,
    'دسته‌بندی': i.category,
    'زمان آماده‌سازی': i.time,
    'موجودی': i.available ? 'موجود' : 'ناموجود',
    'پرفروش': i.popular ? 'بله' : 'خیر',
    'تعداد سفارش': i.orders,
  }));
  exportToExcel(data, `منو-${new Date().toLocaleDateString('fa-IR')}`);
}

export function exportReservationsToExcel(reservations: Reservation[]) {
  const data = reservations.map(r => ({
    'نام': r.name,
    'تلفن': r.phone,
    'تعداد نفرات': r.guests,
    'ساعت': r.time,
    'تاریخ': r.date,
    'میز': r.table,
    'وضعیت': r.status === 'confirmed' ? 'تأیید شده' : r.status === 'pending' ? 'در انتظار' : 'لغو شده',
  }));
  exportToExcel(data, `رزروها-${new Date().toLocaleDateString('fa-IR')}`);
}

export function exportCouponsToExcel(coupons: Coupon[]) {
  const data = coupons.map(c => ({
    'کد': c.code,
    'نوع': c.type === 'percent' ? 'درصدی' : 'مبلغ ثابت',
    'مقدار': c.discount,
    'تاریخ انقضا': c.expiresAt,
    'محدودیت': c.usageLimit,
    'استفاده شده': c.usedCount,
    'وضعیت': c.active ? 'فعال' : 'غیرفعال',
  }));
  exportToExcel(data, `کدهای-تخفیف-${new Date().toLocaleDateString('fa-IR')}`);
}
