-- Define a CTE to select projects from the staging table

{{
    config(
        tags=['transform']
    )
}}

WITH projects AS (
    SELECT
        name,
        project_id,
        emp_id,
        projectManagerId,
        DATE_TRUNC('DAY', startDate::DATE) AS startDate,
        DATE_TRUNC('DAY', endDate::DATE) AS endDate,
        status,
        url,
        approval
    FROM
        {{ ref('project_stg') }}
)

-- Select all columns from the projects CTE including approval_numeric
SELECT 
    *
FROM 
    projects
