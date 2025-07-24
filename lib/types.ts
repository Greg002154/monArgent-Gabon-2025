export interface Budget {
  id: number;
  category: string;
  icon: string;
  color: string;
  budget: number;
  spent: number;
  remaining: number;
}