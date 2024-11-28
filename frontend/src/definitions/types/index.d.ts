export interface OrderItem {
  item_id: string;           
  quantity: number;    
  item_name: number;
  item_price: number;    
}

export interface Order {
  _id: string;               
  table_number: number;      
  order_time: number;        
  total_price: number;       
  order_items: OrderItem[];  
  payment_status: number;    
  order_status: number;      
  created_at: number;        
  updated_at: number;        
}