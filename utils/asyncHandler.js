export const asyncHandler = (FN) => async (req, res, next) => {
  try {
    return await FN(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message
    })
  }
}