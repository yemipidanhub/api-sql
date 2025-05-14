const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middlewares/authMiddleware');

// Get filter options
router.get('/filters', authenticate, async (req, res) => {
  try {
    // Get states
    const [states] = await db.execute('SELECT name FROM states ORDER BY name');
    
    // Get project statuses
    const statuses = ['completed', 'ongoing', 'pending'];
    
    res.json({
      success: true,
      data: {
        states: states.map(s => s.name),
        statuses
      }
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch filter options'
    });
  }
});

// Get LGAs for a state
router.get('/lgas/:state', authenticate, async (req, res) => {
  try {
    const { state } = req.params;
    const [lgas] = await db.execute(
      `SELECT l.name FROM lgas l 
       JOIN states s ON l.state_id = s.id 
       WHERE s.name = ? ORDER BY l.name`,
      [state]
    );
    
    res.json({
      success: true,
      data: lgas.map(l => l.name)
    });
  } catch (error) {
    console.error('Error fetching LGAs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch LGAs'
    });
  }
});

// Download PDF report
router.post('/generate-pdf', authenticate, async (req, res) => {
  try {
    const { filters, selectedReports } = req.body;
    
    // Get report data (same as /generate endpoint)
    const reportData = await getReportData(filters, selectedReports);
    
    // Generate PDF
    const pdfBytes = await PDFService.generateProjectReport(reportData);
    
    // Send PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=project-report.pdf');
    res.send(pdfBytes);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF'
    });
  }
});

// Generate project report
router.post('/generate', authenticate, async (req, res) => {
  try {
    const { filters, selectedReports } = req.body;
    const { status, state, lga, projectId } = filters;
    
    // Base query
    let query = `SELECT 
      project_id as projectID,
      project_name as projectName,
      project_type as type,
      status,
      state,
      lga as LGA,
      start_date as startDate,
      end_date as endDate
    FROM projects WHERE 1=1`;
    
    const params = [];
    
    // Apply filters
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (state) {
      query += ' AND state = ?';
      params.push(state);
    }
    if (lga) {
      query += ' AND lga = ?';
      params.push(lga);
    }
    if (projectId) {
      query += ' AND project_id LIKE ?';
      params.push(`%${projectId}%`);
    }
    
    // Execute query
    const [projects] = await db.execute(query, params);
    
    // Prepare report data based on selected reports
    const reportData = {
      metadata: {
        generatedAt: new Date().toISOString(),
        filters,
        selectedReports
      },
      projects
    };
    
    res.json({
      success: true,
      data: reportData
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report'
    });
  }
});

module.exports = router;