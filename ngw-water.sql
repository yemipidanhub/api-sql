CREATE TABLE form_stage_a (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    project_type ENUM('federal', 'state', 'agency', 'community', 'individual') NOT NULL,
    agency_name VARCHAR(255),
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    client_email VARCHAR(255),
    state VARCHAR(100) NOT NULL,
    lga VARCHAR(100) NOT NULL,
    town VARCHAR(100) NOT NULL,
    street_address TEXT NOT NULL,
    latitude VARCHAR(50),
    longitude VARCHAR(50),
    consultant_name VARCHAR(255),
    consultant_phone VARCHAR(20),
    consultant_email VARCHAR(255),
    consultant_license VARCHAR(100),
    consultant_address TEXT,
    estimated_overburden VARCHAR(100),
    estimated_depth VARCHAR(100),
    estimated_fracture_depth VARCHAR(100),
    estimated_weathered_zone VARCHAR(100),
    curve_type VARCHAR(100),
    accessibility BOOLEAN,
    status ENUM('draft', 'completed') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_stage_a_user (user_id),
    INDEX idx_stage_a_status (status),
    INDEX idx_stage_a_deleted (deleted_at)
) ENGINE=InnoDB;



CREATE TABLE form_stage_b (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    form_stage_a_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    drilling_company VARCHAR(255) NOT NULL,
    drilling_license VARCHAR(100) NOT NULL,
    permit_no VARCHAR(100) NOT NULL,
    permit_issue_date DATE NOT NULL,
    actual_overburden VARCHAR(100) NOT NULL,
    fractured_zone VARCHAR(100) NOT NULL,
    weathered_zone VARCHAR(100) NOT NULL,
    depth_drilled VARCHAR(100) NOT NULL,
    drilled_diameter VARCHAR(100) NOT NULL,
    drilling_method ENUM('mud-drill', 'dthh', 'both') NOT NULL,
    rods JSON,
    casing_diameter VARCHAR(100),
    casing_type VARCHAR(100),
    casing_length VARCHAR(100),
    casing_count VARCHAR(100),
    gravel_packing_size VARCHAR(100),
    is_successful BOOLEAN NOT NULL,
    depth_installed VARCHAR(100),
    discharging_rate VARCHAR(100),
    water_cut BOOLEAN,
    water_cut_date DATE,
    water_cut_time TIME,
    static_water_level VARCHAR(100),
    status ENUM('draft', 'completed') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (form_stage_a_id) REFERENCES form_stage_a(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_stage_b_stage_a (form_stage_a_id),
    INDEX idx_stage_b_user (user_id),
    INDEX idx_stage_b_status (status),
    INDEX idx_stage_b_deleted (deleted_at)
) ENGINE=InnoDB;


CREATE TABLE form_stage_c (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    form_stage_b_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    project_id VARCHAR(100) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    water_type ENUM('Borehole', 'Well', 'Surface Water', 'Rainwater Tank', 'Other') NOT NULL,
    state VARCHAR(100) NOT NULL,
    lga VARCHAR(100) NOT NULL,
    community VARCHAR(100) NOT NULL,
    gps_coordinates VARCHAR(100) NOT NULL,
    tester_full_name VARCHAR(255) NOT NULL,
    tester_role ENUM('Hydrogeologist', 'Engineer', 'Field Officer', 'Lab Technician') NOT NULL,
    tester_license_number VARCHAR(100) NOT NULL,
    tester_phone_number VARCHAR(20) NOT NULL,
    tester_email_address VARCHAR(255),
    date_of_sample_collection DATE NOT NULL,
    time_of_collection TIME NOT NULL,
    collected_by VARCHAR(255) NOT NULL,
    weather_conditions ENUM('Sunny', 'Rainy', 'Cloudy', 'Other') NOT NULL,
    sample_container_type ENUM('Sterile Plastic', 'Glass', 'Other') NOT NULL,
    observations TEXT,
    parameters JSON NOT NULL,
    lab_test_certificate_path VARCHAR(255),
    raw_lab_sheet_path VARCHAR(255),
    sampling_point_photos_paths JSON,
    is_safe ENUM('Yes', 'No', 'Requires Treatment') NOT NULL,
    next_step ENUM('Approve', 'Re-Test', 'Recommend Treatment', 'Abandon Source') NOT NULL,
    comments TEXT,
    signature_data TEXT NOT NULL,
    submission_date DATE NOT NULL,
    status ENUM('draft', 'submitted', 'approved', 'rejected') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (form_stage_b_id) REFERENCES form_stage_b(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_stage_c_stage_b (form_stage_b_id),
    INDEX idx_stage_c_user (user_id),
    INDEX idx_stage_c_status (status),
    INDEX idx_stage_c_deleted (deleted_at)
) ENGINE=InnoDB;


CREATE TABLE file_uploads (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    form_stage_c_id CHAR(36) NOT NULL,
    file_type ENUM('lab_test_certificate', 'raw_lab_sheet', 'sampling_point_photo') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    uploaded_by CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (form_stage_c_id) REFERENCES form_stage_c(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_file_uploads_form (form_stage_c_id),
    INDEX idx_file_uploads_type (file_type),
    INDEX idx_file_uploads_deleted (deleted_at)
) ENGINE=InnoDB;


-- create new form
DELIMITER //
CREATE PROCEDURE create_new_form(
    IN p_user_id CHAR(36),
    IN p_project_type VARCHAR(50),
    OUT p_form_id CHAR(36)
)
BEGIN
    DECLARE new_form_id CHAR(36);
    
    -- Create Stage A
    INSERT INTO form_stage_a (
        user_id,
        project_type,
        status
    ) VALUES (
        p_user_id,
        p_project_type,
        'draft'
    );
    
    SET new_form_id = LAST_INSERT_ID();
    SET p_form_id = new_form_id;
    
    -- Return the new form ID
    SELECT new_form_id AS form_id;
END //
DELIMITER ;


-- submit form
DELIMITER //
CREATE PROCEDURE submit_form(
    IN p_form_stage_c_id CHAR(36),
    IN p_user_id CHAR(36)
)
BEGIN
    DECLARE form_exists INT;
    DECLARE current_status VARCHAR(50);
    
    -- Check if form exists and belongs to user
    SELECT COUNT(*), status INTO form_exists, current_status
    FROM form_stage_c
    WHERE id = p_form_stage_c_id AND user_id = p_user_id;
    
    IF form_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Form not found or access denied';
    ELSEIF current_status != 'completed' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Form is not completed';
    ELSE
        -- Update status to submitted
        UPDATE form_stage_c 
        SET status = 'submitted', 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_form_stage_c_id;
        
        -- Return success
        SELECT 'Form submitted successfully' AS message;
    END IF;
END //
DELIMITER ;


-- form completeion status view
CREATE VIEW form_completion_status AS
SELECT 
    a.id AS form_id,
    a.project_type,
    a.status AS stage_a_status,
    b.status AS stage_b_status,
    c.status AS stage_c_status,
    CASE 
        WHEN c.status = 'submitted' THEN 'Complete'
        WHEN c.status = 'draft' AND b.id IS NOT NULL THEN 'Stage B Complete'
        WHEN b.status = 'draft' AND a.id IS NOT NULL THEN 'Stage A Complete'
        ELSE 'Incomplete'
    END AS overall_status,
    a.created_at,
    a.updated_at
FROM 
    form_stage_a a
LEFT JOIN 
    form_stage_b b ON a.id = b.form_stage_a_id
LEFT JOIN 
    form_stage_c c ON b.id = c.form_stage_b_id;

-- water qualty/stage C result view
CREATE VIEW water_quality_results AS
SELECT 
    c.id,
    c.project_id,
    c.project_name,
    c.water_type,
    c.state,
    c.lga,
    c.community,
    c.is_safe,
    c.next_step,
    JSON_EXTRACT(c.parameters, '$[*].parameter') AS parameters_tested,
    c.submission_date,
    u.full_name AS submitted_by
FROM 
    form_stage_c c
JOIN 
    users u ON c.user_id = u.id
WHERE 
    c.status = 'submitted' 
    AND c.deleted_at IS NULL;