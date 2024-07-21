import { formatDate } from "@/lib/utils";

export const purchaseHistoryColumns = [
    { title: 'Oluşturulma Tarihi', dataIndex: 'createDate', value: 'createDate', valueFormatter: formatDate },
    { title: 'Tutar', dataIndex: 'amount', value: 'amount' },
    { title: 'Paket', dataIndex: 'packageId', value: 'packageId' },
  ];