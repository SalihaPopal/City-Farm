-- Create a table to store Managers
CREATE TABLE managers (
    manager_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);

-- Create a table to store Volunteers
CREATE TABLE volunteers (
    volunteer_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);

-- Create a table to store Sessions
CREATE TABLE sessions (
    session_id INT PRIMARY KEY,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    capacity INT NOT NULL,
    is_morning BOOLEAN NOT NULL,
    is_evening BOOLEAN NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES managers(manager_id),
    FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
);

CREATE TABLE bookings (
    booking_id INT PRIMARY KEY,
    ses_id INT REFERENCES sessions(session_id) NOT NULL,
    vol_id INT REFERENCES volunteers(volunteer_id) NOT NULL
);

-- Create a table to track session availability
CREATE TABLE session_availability (
    availability_id INT PRIMARY KEY,
    session_id INT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id)
);


-- Sample data for Managers
INSERT INTO managers (manager_id, username, password, name, email, phone_number)
VALUES
    ('1', 'JohnDoe', 'hashed_password_1', 'John Doe', 'john@example.com', '123-456-7890');

    INSERT INTO managers (manager_id, username, password, name, email, phone_number)
VALUES
     ('2', 'JohnRoman', 'hashed_password_2', 'John Roman', 'deroy@example.com', '987-654-3210');



-- Sample data for Volunteers
INSERT INTO volunteers (volunteer_id, username, password, name, email, phone_number)
VALUES
    ('1',' RomanJoey', 'hashed_password_3', 'Roman Joey', 'rom@example.com', '111-222-3333'),
    ('2', 'Roma', 'hashed_password_4', 'Roma', 'roma@example.com', '111-222-444'),
    ('3', 'Joey', 'hashed_password_5', 'Joey', 'joey@example.com', '111-222-5555'),
    ('4', 'Hiking', 'hashed_password_6', 'Hiking', 'hik@example.com', '111-222-6666'),
    ('5', 'Shreen', 'hashed_password_7', 'Shreen Ali', 'shreen@example.com', '111-222-777'),
    ('6', 'John Roy', 'hashed_password_8', 'John Roy', 'Roy@example.com', '444-555-6666');


-- Sample data for Sessions
INSERT INTO sessions (session_id, session_status, date, time, capacity, is_morning, is_evening)
VALUES
    ('1', 'Not booked', '2023-3-8', '11:30:00', '2', 'Available','Available'),
    ('2', 'Not booked', '2023-5-10', '14:00:00', '5','Not available', 'Available'),
    ('3', 'Booked', '2023-4-5', '09:00:00', '4','Available', 'Not available');


-- Sample data for SessionAvailability (Assuming all sessions are initially available)
INSERT INTO session_availability (availability_id , session_id) 
VALUES('1', '1');

INSERT INTO bookings (booking_id, ses_id, vol_id)
VALUES
    (1, 1, 2),
    (2, 2, 3),
    (3, 3, 1),
    (4, 2, 4);








