const db = require('../config/db');

class Media {
  static async create({ formStageAId = null, fileUrl, fileType, userId }) {
    const [result] = await db.execute(
      'INSERT INTO media (formStageAId, fileUrl, fileType, userId) VALUES (?, ?, ?, ?, ?)',
      [formStageAId, fileUrl, fileType, userId]
    );
    console.log(userId)
    return { id: result.insertId, formStageAId, fileUrl, fileType };
  }

  static async findByFormStageAId(formStageAId) {
    const [rows] = await db.execute('SELECT * FROM media WHERE formStageAId = ?', [formStageAId]);
    return rows;
  }

  // static async findByFormStageBId(formStageBId) {
  //   const [rows] = await db.execute('SELECT * FROM media WHERE formStageBId = ?', [formStageBId]);
  //   return rows;
  // }

  static async delete(id) {
    const [media] = await db.execute('SELECT * FROM media WHERE id = ?', [id]);
    await db.execute('DELETE FROM media WHERE id = ?', [id]);
    return media[0];
  }
}


module.exports = Media;