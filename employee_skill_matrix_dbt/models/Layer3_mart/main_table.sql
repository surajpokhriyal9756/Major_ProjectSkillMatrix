-- Define a CTE to select users from the staging table
{{
    config(
        tags=['mart']
    )
}}


WITH users AS (
    SELECT
*
    FROM
        {{ ref('user_transform') }}
),

-- Define a CTE to count the number of skills for each user
user_skills AS (
    SELECT
        s.emp_id,
        COUNT( s.name) AS num_skills
    FROM
        {{ ref('skill_transform') }} s
    JOIN
        users u ON s.emp_id = u.emp_id
    GROUP BY
        s.emp_id
),

-- Define a CTE to count the number of certifications for each user
user_certificates AS (
    SELECT
        c.emp_id,
        COUNT( c.title) AS num_certificates
    FROM
        {{ ref('certificate_transform') }} c
    JOIN
        users u ON c.emp_id = u.emp_id
    GROUP BY
        c.emp_id
),

-- Define a CTE to count the number of approved certifications for each user
user_approved_certificates AS (
    SELECT
        c.emp_id,
        COUNT(*) AS num_approved_certificates
    FROM
        {{ ref('certificate_transform') }} c
    JOIN
        users u ON c.emp_id = u.emp_id
    WHERE
        c.approval = 'Approved' -- Filter for approved certificates
    GROUP BY
        c.emp_id
),

-- Define a CTE to count the number of rejected certifications for each user
user_rejected_certificates AS (
    SELECT
        c.emp_id,
        COUNT(*) AS num_rejected_certificates
    FROM
        {{ ref('certificate_transform') }} c
    JOIN
        users u ON c.emp_id = u.emp_id
    WHERE
        c.approval = 'Rejected' -- Filter for rejected certificates
    GROUP BY
        c.emp_id
),

-- Define a CTE to count the number of projects for each user
user_projects AS (
    SELECT
        p.emp_id,
        COUNT(*) AS num_projects
    FROM
        {{ ref('project_transform') }} p
    JOIN
        users u ON p.emp_id = u.emp_id
    GROUP BY
        p.emp_id
),

-- Define a CTE to count the number of approved projects for each user
user_approved_projects AS (
    SELECT
        p.emp_id,
        COUNT(*) AS num_approved_projects
    FROM
        {{ ref('project_transform') }} p
    JOIN
        users u ON p.emp_id = u.emp_id
    WHERE
        p.approval = 'Approved' -- Filter for approved projects
    GROUP BY
        p.emp_id
),

-- Define a CTE to count the number of rejected projects for each user
user_rejected_projects AS (
    SELECT
        p.emp_id,
        COUNT(*) AS num_rejected_projects
    FROM
        {{ ref('project_transform') }} p
    JOIN
        users u ON p.emp_id = u.emp_id
    WHERE
        p.approval = 'Rejected' -- Filter for rejected projects
    GROUP BY
        p.emp_id
)
-- Kpi Table
-- Select the users along with the number of skills, certificates, and projects they have
SELECT
    u.*,
    COALESCE(us.num_skills, 0) AS num_skills,
    COALESCE(uc.num_certificates, 0) AS num_certificates,
    COALESCE(uac.num_approved_certificates, 0) AS num_approved_certificates,
    COALESCE(urc.num_rejected_certificates, 0) AS num_rejected_certificates,
    COALESCE(up.num_projects, 0) AS num_projects,
    COALESCE(uap.num_approved_projects, 0) AS num_approved_projects,
    COALESCE(urp.num_rejected_projects, 0) AS num_rejected_projects,
    COALESCE((SELECT SUM(num_approved_certificates) FROM user_approved_certificates WHERE emp_id = u.emp_id), 0) +
    COALESCE((SELECT SUM(num_approved_projects) FROM user_approved_projects WHERE emp_id = u.emp_id), 0) +
    COALESCE((SELECT SUM(total_proficiency_score) FROM skill_table WHERE emp_id = u.emp_id), 0) AS performance_metrics
FROM
    users u
LEFT JOIN
    user_skills us ON u.emp_id = us.emp_id
LEFT JOIN
    user_certificates uc ON u.emp_id = uc.emp_id
LEFT JOIN
    user_approved_certificates uac ON u.emp_id = uac.emp_id
LEFT JOIN
    user_rejected_certificates urc ON u.emp_id = urc.emp_id
LEFT JOIN
    user_projects up ON u.emp_id = up.emp_id
LEFT JOIN
    user_approved_projects uap ON u.emp_id = uap.emp_id
LEFT JOIN
    user_rejected_projects urp ON u.emp_id = urp.emp_id
