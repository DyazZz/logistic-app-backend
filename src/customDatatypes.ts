export type Application = {
  id: number;
  applicationUID: string;
  date: string;
  companyName: string;
  driverName: string;
  driverPhone: string;
  comment: string;
  status: 1 | 2 | 3 | string;
  ATI: string;
};
