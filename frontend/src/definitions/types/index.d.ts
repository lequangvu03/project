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

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  tag: number[]; 
  category_id: string;
  stock: number;
  image: string;
  ingredients: string; 
  created_at: number; 
  updated_at: number; 
  category_name: string;
};
