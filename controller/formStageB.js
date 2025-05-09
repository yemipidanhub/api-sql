const FormStageB = require('../models/StageB.model');
const FormStageA = require('../models/StageA.model');

class FormStageBController {
  static async create(req, res) {
    try {
      const { formStageAId } = req.params;
      const { body, userId } = req;
      
      // Verify that Stage A exists
      const stageA = await FormStageA.findById(formStageAId);
      if (!stageA) {
        return res.status(404).json({ 
          success: false, 
          message: 'Stage A form not found' 
        });
      }
      
      const result = await FormStageB.create(body, formStageAId, userId);
      
      res.status(201).json({ 
        success: true, 
        data: result,
        message: 'Stage B form created successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  static async getByStageAId(req, res) {
    try {
      const { formStageAId } = req.params;
      const form = await FormStageB.findByFormStageAId(formStageAId);
      
      if (!form) {
        return res.status(404).json({ 
          success: false, 
          message: 'Form not found' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        data: form 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      
      const form = await FormStageB.findById(id);
      if (!form) {
        return res.status(404).json({ 
          success: false, 
          message: 'Form not found' 
        });
      }
      
      const updatedForm = await FormStageB.update(id, body);
      
      res.status(200).json({ 
        success: true, 
        data: updatedForm,
        message: 'Stage B form updated successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}

module.exports = FormStageBController;