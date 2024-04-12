-- Define a Common Table Expression (CTE) to select columns from the users_stg table
{{
    config(
        tags=['transform']
    )
}}

WITH users AS (
    SELECT
        first_name,
        last_name,
        email,
        role,
        designation,
        DATE_TRUNC('DAY', dob::DATE) AS DateOfJoining,
        phone_number,
        emp_id
    FROM
         {{ref('users_stg')}} 
)

-- Select data from the CTE and calculate the years of experience
SELECT
    u.*,
    YEAR(CURRENT_DATE()) - YEAR(u.DateOfJoining) AS years_of_experience
FROM
    users u
