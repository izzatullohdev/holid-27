const ErrorResponse = require('../../utils/errorResponse');
const asyncHandle = require('../../middlewares/async');
const { Certificate } = require('../../models');

// GET: Barcha sertifikatlar
// Route: /admin/certificates
exports.allCertificates = asyncHandle(async (req, res, next) => {
  const certificates = await Certificate.findAll();
  res.status(200).json({
    success: true,
    data: certificates,
  });
});

// GET: Bitta sertifikat
// Route: /admin/certificates/:id
exports.oneCertificate = asyncHandle(async (req, res, next) => {
  const certificate = await Certificate.findByPk(req.params.id);
  if (!certificate) {
    return next(new ErrorResponse('Certificate not found', 404));
  }

  res.status(200).json({
    success: true,
    data: certificate,
  });
});

// POST: Yangi sertifikat qo‘shish
// Route: /admin/certificates
exports.createCertificate = asyncHandle(async (req, res, next) => {
  const { title, info, certificateLink } = req.body;

  if (!certificateLink) {
    return next(new ErrorResponse('Certificate link is required', 400));
  }

  const newCertificate = await Certificate.create({ title, info, certificateLink });

  res.status(201).json({
    success: true,
    message: 'New certificate successfully created',
    data: newCertificate,
  });
});

// PUT: Sertifikatni yangilash
// Route: /admin/certificates/:id
exports.updateCertificate = asyncHandle(async (req, res, next) => {
  const { title, info, certificateLink } = req.body;

  const [updatedRows] = await Certificate.update(
    { title, info, certificateLink },
    { where: { id: req.params.id } }
  );

  if (updatedRows === 0) {
    return next(new ErrorResponse('Certificate not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Certificate successfully updated',
  });
});

// DELETE: Sertifikatni o‘chirish
// Route: /admin/certificates/:id
exports.deleteCertificate = asyncHandle(async (req, res, next) => {
  const deletedRows = await Certificate.destroy({ where: { id: req.params.id } });

  if (deletedRows === 0) {
    return next(new ErrorResponse('Certificate not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Certificate successfully destroyed',
  });
});
