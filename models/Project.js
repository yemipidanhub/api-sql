const DatabaseService = require('../services/database');

class Project {
  static async findAll({ status, state, lga, projectId, startDate, endDate, page = 1, pageSize = 10 }) {
    let query = `SELECT * FROM projects WHERE 1=1`;
    const params = [];
    
    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }
    
    if (state) {
      query += ` AND state = ?`;
      params.push(state);
    }
    
    if (lga) {
      query += ` AND lga = ?`;
      params.push(lga);
    }
    
    if (projectId) {
      query += ` AND projectID LIKE ?`;
      params.push(`%${projectId}%`);
    }
    
    if (startDate && endDate) {
      query += ` AND startDate BETWEEN ? AND ?`;
      params.push(new Date(startDate), new Date(endDate));
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM (${query}) as filtered`;
    const [countResult] = await DatabaseService.query(countQuery, params);
    const total = countResult[0].total;

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(pageSize), (page - 1) * pageSize);

    const projects = await DatabaseService.query(query, params);
    return { projects, total };
  }
}

module.exports = Project;