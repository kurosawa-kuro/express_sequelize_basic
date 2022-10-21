const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator');

const { Sample } = require("../../db/models/")

// @desc    Create Sample
// @route   POST /samples
// @access  Public
const createSample = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const foundSampleWithEmail = await Sample.findOne({ where: { email: req.body.email } });
    // console.log({ foundSampleWithId })

    if (foundSampleWithEmail) {
        res.statusCode = 404
        throw new Error('sample already exists');
    }

    const sample = await Sample.create(req.body)
    // console.log("sample", JSON.stringify(sample, null, 2))

    const msg = "Successfully created Sample"
    const data = sample

    return res.status(201).json({ isSuccess: true, msg, data })
})

// @desc    Read Samples
// @route   GET /samples
// @access  Public
const readSamples = asyncHandler(async (req, res) => {
    const samples = await Sample.findAll()
    // console.log("samples", JSON.stringify(samples, null, 2))

    const data = samples
    const msg = samples.length !== 0 ? "Successfully read Samples" : "Successfully read Samples but empty"

    return res.status(200).json({ isSuccess: true, msg, data })
})

// @desc    Read sample
// @route   GET /samples/:id
// @access  Public
const readSample = asyncHandler(async (req, res) => {
    const sample = await Sample.findByPk(req.params.id)
    // console.log("JSON.stringify(sample, null, 2)", JSON.stringify(sample, null, 2))

    const msg = sample ? "Successfully found Samples" : "Successfully found Samples but empty"
    const data = sample

    return res.status(200).json({ isSuccess: true, msg, data })
})

// @desc    Update sample
// @route   PUT /api/samples/:id
// @access  Public
const updateSample = asyncHandler(async (req, res) => {
    const id = req.params.id

    const foundSampleWithId = await Sample.findByPk(id);
    // console.log({ foundSampleWithId })

    if (!foundSampleWithId) {
        res.statusCode = 404
        throw new Error('sample not found');
    }

    await Sample.update(req.body, {
        where: { id }
    });

    foundSampleWithId.name = req.body.name
    foundSampleWithId.role = req.body.role

    const msg = "Successfully updated Sample"
    const data = foundSampleWithId

    return res.status(201).json({ isSuccess: true, msg, data })
})

// @desc    Delete sample
// @route   DELETE samples/:id
// @access  Public
const deleteSample = asyncHandler(async (req, res) => {
    const id = req.params.id

    const foundSampleWithId = await Sample.findByPk(id);
    // console.log({ foundSampleWithId })

    if (!foundSampleWithId) {
        res.statusCode = 404
        throw new Error('sample not found');
    }

    await Sample.destroy({
        where: { id }
    });
    const msg = "Successfully deleted Sample"
    const data = foundSampleWithId

    return res.status(201).json({ isSuccess: true, msg, data })
})

// @desc    Search samples
// @route   GET /samples/search?keyword
// @access  Public
const searchSamples = asyncHandler(async (req, res) => {
    console.log("searchSamples")
    const { keyword } = req.query

    const samples = await Sample.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: '%' + keyword + '%'
                    }
                }
            ]
        }
    })

    const data = samples
    const msg = samples.length === 0 ? "Successfully searched Samples but empty" : "Successfully searched Samples"

    return res.status(200).json({ isSuccess: true, msg, data })
})


module.exports = {
    createSample,
    readSamples,
    readSample,
    searchSamples,
    updateSample,
    deleteSample
}