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
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20), -- Corrected data type here
    address VARCHAR(255) NOT NULL
);


-- Create a table to store Sessions
CREATE TABLE sessions (
    session_id INT PRIMARY KEY,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    capacity INT NOT NULL,
    is_morning BOOLEAN NOT NULL,
    is_evening BOOLEAN NOT NULL,
    session_status VARCHAR(50) NOT NULL
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
INSERT INTO volunteers (volunteer_id, first_name, last_name, email, phone_number, address)
VALUES
    ('1', 'Roman', 'Joey', 'rom@example.com', '111-222-3333', '123 Main St'),
    ('2', 'Roma', 'Roma', 'roma@example.com', '111-222-444', '113 Main St'),
    ('3', 'Joey', 'hashed_password_5', 'joey@example.com', '111-222-5555', '122 Main St'),
    ('4', 'Hiking', 'Hiking', 'hik@example.com', '111-222-6666', '223 Main St'),
    ('5', 'Shreen', 'Ali', 'shreen@example.com', '111-222-777', '333 Main St'),
    ('6', 'John', 'Roy', 'Roy@example.com', '444-555-6666', '114 Main St');



-- Sample data for Sessions
INSERT INTO sessions (session_id, session_date, session_time, capacity, is_morning, is_evening, session_status)
VALUES
    ('1', '2023-9-8', '11:30:00', '2', 'false','false', 'Not Available'),
    ('2', '2023-9-10', '14:00:00', '5','false', 'true', 'Available'),
    ('3', '2023-10-5', '09:00:00', '4','true', 'false', 'Available');


-- Sample data for SessionAvailability (Assuming all sessions are initially available)
INSERT INTO session_availability (availability_id , session_id) 
VALUES('1', '1');

INSERT INTO bookings (booking_id, session_id, volunteer_id)
VALUES
    (1, 1, 2),
    (2, 2, 3),
    (3, 3, 1),
    (4, 2, 4);








