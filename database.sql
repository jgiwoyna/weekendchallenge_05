CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(80),
  last_name VARCHAR(80),
  id_number INTEGER,
  job_title VARCHAR(80),
  annual_salary NUMERIC(8,2),
  active BOOLEAN
);

INSERT INTO employees
VALUES (1, 'Charles', 'Mingus', 3845, 'Bass', 85000, 'True'),
(2, 'Duke', 'Ellington', 4796, 'Piano', 96000, 'True'),
(3, 'Max', 'Roach', 3250, 'Drums', 78500, 'False');

SELECT *
FROM employees;

SELECT SUM (annual_salary/12) as monthly_expenditures
FROM employees;
