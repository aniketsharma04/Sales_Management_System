import { SalesRecord } from '@/types/sales';

// Generate mock data - will be replaced with actual CSV data later
const customerNames = [
  'Neha Yadav', 'Rahul Sharma', 'Priya Singh', 'Amit Kumar', 'Sneha Patel',
  'Vikram Reddy', 'Ananya Gupta', 'Rohit Verma', 'Kavya Nair', 'Arjun Mehta',
  'Pooja Joshi', 'Sanjay Kapoor', 'Meera Iyer', 'Deepak Malhotra', 'Shruti Bose'
];

const regions = ['North', 'South', 'East', 'West', 'Central'];
const genders = ['Male', 'Female'];
const customerTypes = ['Regular', 'Premium', 'New'];
const productCategories = ['Clothing', 'Electronics', 'Footwear', 'Accessories', 'Home & Living'];
const tags = ['Trending', 'New Arrival', 'Best Seller', 'Sale', 'Premium'];
const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];
const orderStatuses = ['Completed', 'Pending', 'Shipped', 'Cancelled'];
const deliveryTypes = ['Express', 'Standard', 'Same Day'];
const brands = ['Nike', 'Adidas', 'Puma', 'Samsung', 'Apple', 'Sony', 'H&M', 'Zara', 'Levis'];
const productNames = ['T-Shirt', 'Jeans', 'Sneakers', 'Headphones', 'Watch', 'Bag', 'Jacket', 'Dress', 'Sandals'];
const employeeNames = ['Harsh Agrawal', 'Priyanka Das', 'Suresh Kumar', 'Anjali Verma', 'Ravi Shankar'];
const storeLocations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'];

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const generatePhoneNumber = (): string => {
  return `+91 ${getRandomNumber(7000000000, 9999999999)}`;
};

const generateDate = (): string => {
  const start = new Date('2023-01-01');
  const end = new Date('2024-12-01');
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

export const generateMockData = (count: number = 100): SalesRecord[] => {
  const records: SalesRecord[] = [];

  for (let i = 1; i <= count; i++) {
    const pricePerUnit = getRandomNumber(500, 5000);
    const quantity = getRandomNumber(1, 5);
    const discountPercentage = getRandomNumber(0, 30);
    const totalAmount = pricePerUnit * quantity;
    const finalAmount = totalAmount - (totalAmount * discountPercentage / 100);

    records.push({
      transactionId: `TXN${String(i).padStart(6, '0')}`,
      date: generateDate(),
      customerId: `CUST${String(getRandomNumber(10000, 99999))}`,
      customerName: getRandomItem(customerNames),
      phoneNumber: generatePhoneNumber(),
      gender: getRandomItem(genders),
      age: getRandomNumber(18, 65),
      customerRegion: getRandomItem(regions),
      customerType: getRandomItem(customerTypes),
      productId: `PROD${String(getRandomNumber(1000, 9999))}`,
      productName: getRandomItem(productNames),
      brand: getRandomItem(brands),
      productCategory: getRandomItem(productCategories),
      tags: getRandomItem(tags),
      quantity,
      pricePerUnit,
      discountPercentage,
      totalAmount,
      finalAmount,
      paymentMethod: getRandomItem(paymentMethods),
      orderStatus: getRandomItem(orderStatuses),
      deliveryType: getRandomItem(deliveryTypes),
      storeId: `STR${String(getRandomNumber(100, 999))}`,
      storeLocation: getRandomItem(storeLocations),
      salespersonId: `EMP${String(getRandomNumber(100, 999))}`,
      employeeName: getRandomItem(employeeNames),
    });
  }

  return records;
};

// Export initial mock data
export const mockSalesData = generateMockData(150);
