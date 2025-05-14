const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');
const path = require('path');

class PDFService {
  static async generateProjectReport(reportData) {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    
    // Load font
    const fontBytes = fs.readFileSync(path.join(__dirname, '../fonts/Roboto-Regular.ttf'));
    const font = await pdfDoc.embedFont(fontBytes);
    
    // Add a new page
    const page = pdfDoc.addPage([595, 842]); // A4 size
    
    // Draw header
    page.drawText('Project Report', {
      x: 50,
      y: 780,
      size: 24,
      font,
      color: rgb(0, 0, 0)
    });
    
    page.drawText(`Generated on: ${new Date(reportData.metadata.generatedAt).toLocaleDateString()}`, {
      x: 50,
      y: 750,
      size: 12,
      font,
      color: rgb(0, 0, 0)
    });
    
    // Add project summary if selected
    if (reportData.metadata.selectedReports.includes('project-summary')) {
      page.drawText('Project Summary', {
        x: 50,
        y: 700,
        size: 16,
        font,
        color: rgb(0, 0, 0)
      });
      
      // Draw table headers
      const headers = ['Project ID', 'Status', 'Type', 'Location'];
      headers.forEach((header, i) => {
        page.drawText(header, {
          x: 50 + (i * 150),
          y: 670,
          size: 12,
          font,
          color: rgb(0, 0, 0)
        });
      });
      
      // Draw project rows
      reportData.projects.forEach((project, rowIndex) => {
        const yPos = 650 - (rowIndex * 20);
        const values = [
          project.projectID,
          project.status,
          project.type,
          `${project.state} - ${project.LGA}`
        ];
        
        values.forEach((value, i) => {
          page.drawText(value, {
            x: 50 + (i * 150),
            y: yPos,
            size: 10,
            font,
            color: rgb(0, 0, 0)
          });
        });
      });
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }
}

module.exports = PDFService;