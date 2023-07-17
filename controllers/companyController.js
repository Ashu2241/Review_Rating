const companySchema = require('../models/companySchema')
const companyReviewSchema = require('../models/companyReviewSchema')
const { unlinkSync } = require("fs");

module.exports = {
    createCompany: async (req, res) => {
        let companyData = new companySchema(req.body);
        try {
            let isCompanyExist = await companySchema.findOne({
                companyName: req.body.companyName
            });
            if (isCompanyExist) {
                req.file ? unlinkSync(req.file.path) : null; //Delete multer unnecessary uploaded photo
                res.status(409).send({
                    success: false,
                    message: "company is already exist",
                });
            }
            else {
                const filePath = `/uploads/companyImage/${req.file.filename}`;
                companyData.companyPic = filePath;
                const company = await companyData.save();
                res.status(201).send({
                    success: true,
                    message: "Company created successfully",
                    data: companyData,
                });
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },

    companyList: async (req, res) => {
        try {
            const companyList = await companySchema.find();
            const totalCompany = await companySchema.find().count();
            res.status(200).json({
                success: true,
                message: "All company found successfully",
                count: totalCompany,
                companies: companyList,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    },

    companyDetails : async (req, res) => {
        try{
            const companyData = await companySchema.findById(req.params.id);
            const reviewDataList = await companyReviewSchema
            .find({ companyId: req.params.id})
            .populate({ path: "userId", select: "userName profilePic"});
            res.status(200).json({
                success: true,
                message: "Review list fatched successfully",
                company: companyData,
                review: reviewDataList,
            });
    
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: `Review not found ${error.message}`,
            })
        }
    },

    companySearch : async (req, res) => {
        const {letter} = req.params;
        try {
            const companies = await companySchema.find({
                companyName:{$regex:`^${letter}`,$options: "i"},
            });
            if(companies.length > 0 ) {
                res.status(200).json({
                    success: true,
                    message: "all details of company show successfully",
                    companies: companies,
                })
            }
            else {
                res.status(500).json({
                    success: false,
                    message: "company not  found",
            })
        }
    }
        catch (error) {
            res.status(500).json({
                success: false,
                message: `Review Not Found ${error.message}`,
            });
        }
    }
}
