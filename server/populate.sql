-- Create a table to store Managers
CREATE TABLE managers (
    manager_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address VARCHAR(255) NOT NULL
);

-- Create a table to store Volunteers
CREATE TABLE volunteers (
    volunteer_id INT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    email_address VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) 
);


-- Create a table to store Sessions
CREATE TABLE sessions (
    session_id INT PRIMARY KEY,
    session_date DATE NOT NULL,
    session_slot VARCHAR(50) NOT NULL,
    session_status VARCHAR(50) NOT NULL,
    
);

CREATE TABLE bookings (
    booking_id INT PRIMARY KEY,
    session_id INT REFERENCES sessions(session_id) NOT NULL,
    volunteer_id INT REFERENCES volunteers(volunteer_id) NOT NULL
);


-- Create a table to track session availability
CREATE TABLE session_availability (
    availability_id INT PRIMARY KEY,
    session_id INT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id)
);


-- Sample data for Managers
INSERT INTO managers (manager_id, first_name, last_name, email, phone_number, address)
VALUES
    ('1', 'John', 'Doe', 'john@example.com', '123-456-7890', '123 Main St');

INSERT INTO managers (manager_id, first_name, last_name, email, phone_number, address)
VALUES
    ('2', 'John', 'Roman', 'rom@example.com', '987-654-3210', '456 Old St');


-- Sample data for Volunteers
INSERT INTO volunteers (volunteer_id, full_name, email_address, phone_number)
VALUES
    ('1', 'Roman Joey', 'rom@example.com', '111-222-3333'),
    ('2', 'Roma Roma', 'roma@example.com', '111-222-444'),
    ('3', 'Joey hashed_password_5', 'joey@example.com', '111-222-5555'),
    ('4', 'Hiking Hiking', 'hik@example.com', '111-222-6666'),
    ('5', 'Shireen Ali', 'shreen@example.com', '111-222-777'),
    ('6', 'John Roy', 'Roy@example.com', '444-555-6666');



-- Sample data for Sessions
INSERT INTO sessions (session_id, session_date, session_slot, session_status)
VALUES
    ('1','2023-10-13', 'morning', 'Not Available'),
    ('2','2023-10-14', 'evening', 'Available'),
    ('3','2023-10-15', 'morning', 'Available'),
    ('4','2023-10-16', 'morning', 'Not Available'),
    ('5','2023-10-17', 'evening', 'Available'),
    ('6','2023-10-18', 'morning', 'Not Available');


-- Sample data for SessionAvailability (Assuming all sessions are initially available)
INSERT INTO session_availability (availability_id , session_id) 
VALUES('1', '1');

INSERT INTO bookings (booking_id, session_id, volunteer_id)
VALUES
    (1, 1, 2),
    (2, 2, 3),
    (3, 3, 1),
    (4, 2, 4);








