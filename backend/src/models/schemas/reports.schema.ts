import { ObjectId } from 'mongodb'

interface ReportType {
  report_id: ObjectId
  report_type: string
  start_date: Date
  end_date: Date
  total_sales: number
  total_orders: number
  total_customers: number
  items_sold: ObjectId[]
  trends: {
    best_selling_item: ObjectId
    sales_growth_rate: number
    peak_sales_day: Date
  }
  created_at: Date
  updated_at: Date
}

export class Report {
  report_id: ObjectId
  report_type: string
  start_date: Date
  end_date: Date
  total_sales: number
  total_orders: number
  total_customers: number
  items_sold: ObjectId[]
  trends: {
    best_selling_item: ObjectId
    sales_growth_rate: number
    peak_sales_day: Date
  }
  created_at: Date
  updated_at: Date

  constructor(report: ReportType) {
    this.report_id = report.report_id
    this.report_type = report.report_type
    this.start_date = report.start_date
    this.end_date = report.end_date
    this.total_sales = report.total_sales
    this.total_orders = report.total_orders
    this.total_customers = report.total_customers
    this.items_sold = report.items_sold
    this.trends = report.trends
    this.created_at = report.created_at
    this.updated_at = report.updated_at
  }
}
