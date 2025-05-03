// Submit Stage C
exports.submitStageC = async (req, res) => {
    try {
      const project = await Project.findOne({
        where: { 
          id: req.params.projectId, 
          userId: req.user.id,
          status: 'completed' // Only allow if project is completed (Stage B submitted)
        }
      });
  
      if (!project) {
        return res.status(404).json({ 
          error: 'Project not found or not in completed status' 
        });
      }
  
      // Check if Stage B exists (prerequisite)
      const stageB = await FormStageB.findOne({
        where: { projectId: project.id }
      });
  
      if (!stageB) {
        return res.status(400).json({ 
          error: 'Stage B must be completed before submitting Stage C' 
        });
      }
  
      // Process file uploads
      const files = req.files;
      const filePaths = {};
      
      if (files.labTestCertificate) {
        filePaths.labTestCertificatePath = await saveFile(
          files.labTestCertificate[0], 
          'certificates'
        );
      }
      
      if (files.rawLabSheet) {
        filePaths.rawLabSheetPath = await saveFile(
          files.rawLabSheet[0], 
          'labsheets'
        );
      }
      
      if (files.samplingPointPhotos) {
        filePaths.samplingPointPhotosPaths = await Promise.all(
          files.samplingPointPhotos.map(file => 
            saveFile(file, 'sampling-photos')
        ))
      }
  
      // Create or update Stage C
      const [stageC, created] = await FormStageC.upsert({
        ...req.body,
        ...filePaths,
        projectId: project.id,
        userId: req.user.id
      }, {
        returning: true
      });
  
      res.json(stageC);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit Stage C' });
    }
  };
  
  // Get Stage C data
  exports.getStageC = async (req, res) => {
    try {
      const stageC = await FormStageC.findOne({
        where: { 
          projectId: req.params.projectId,
          userId: req.user.id 
        }
      });
  
      if (!stageC) {
        return res.status(404).json({ error: 'Stage C data not found' });
      }
  
      res.json(stageC);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get Stage C data' });
    }
  };