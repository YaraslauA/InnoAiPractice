-- Query 1: Total amount for March
SELECT SUM(amount) as total_march_amount
FROM orders
WHERE strftime('%m', order_date) = '03';

-- Query 2: Top spending customer of all time
SELECT customer, SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- Query 3: Average order value
SELECT AVG(amount) as average_order_value
FROM orders; 