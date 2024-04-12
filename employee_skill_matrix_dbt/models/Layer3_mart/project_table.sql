-- File: models/skills_count.sql
{{
    config(
        tags=['mart']
    )
}}

-- F-- Define a CTE to select projects from the staging table
WITH projects AS (
    SELECT
        name,
        project_id,
        emp_id,
        projectManagerId,
        startDate,
        endDate,
        status,
        url,
        CASE
            WHEN approval = 'Approved' THEN 1
            WHEN approval = 'Rejected' THEN 0
            ELSE NULL
        END AS approval_numeric
    FROM
        {{ ref('project_transform') }}
)

-- Select the number of approved and rejected projects for each employee
SELECT 
    emp_id,
    SUM(CASE WHEN approval_numeric = 1 THEN 1 ELSE 0 END) AS num_approved_projects,
    SUM(CASE WHEN approval_numeric = 0 THEN 1 ELSE 0 END) AS num_rejected_projects
FROM 
    projects
GROUP BY 
    emp_id
