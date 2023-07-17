const companyReviewSchema = require('../models/companyReviewSchema')
const companySchema = require('../models/companySchema');

const createReview = async (req, res) => {
    const reviewData = new companyReviewSchema(req.body);
    try {
        await reviewData.save();
        res.status(200).json({
            success: true,
            message: "Review added successfully",
            review: reviewData,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: `Error occur ${error.message}`,
        });
    }
};

const deleteReview = async (req, res) => {
    const reviewID = req.params.id
    try {
        const deleteData = await companyReviewSchema.findByIdAndDelete(reviewID);
        res.status(202).json({
            success: true,
            message: "Review deleted successfully",
            deletedReview: deleteData
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error occur ${error.message}`
        });
    }

};

const updateReview = async (req, res) => {
    try {
        const reviewData = await companyReviewSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
        );
        if (reviewData) {
            res.status(202).json({
                success: true,
                message: "Review update successfully",
                updateReview: reviewData,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Review is not found",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Error occur ${err.message}`,
        });
    }
};

module.exports =
{
    createReview,
    deleteReview,
    updateReview,
}
