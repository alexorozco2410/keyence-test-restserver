const { response, request } = require('express')

const DocumentModel = require('../models/document.model')

const getDocuments = async(req = request, res = response) => {

    try {
        const { limit = 10, from = 0 } = req.query

        const [total, documents] = await Promise.all([
            DocumentModel.countDocuments({ status: true }),
            DocumentModel.find({ status: true })
                .skip( Number(from) )
                .limit( Number(limit) )
        ])

        res.status(200).json({
            total,
            documents,
            
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador de la base de datos'
        })
    }
}

const getDocumentById = async(req = request, res = response) => {

    try{
        const document = await DocumentModel.findOne({_id: req.params.id})

        res.status(200).json({
            document
        })

    } catch( error ) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador de la base de datos'
        })
    }
}

const deleteOneData = async(req = request, res = response) => {

    console.log(req.body)

    try{
        let data = await DocumentModel.findOneAndUpdate({"_id": req.params.id},
            {
                $pull: {
                    "data": {
                        "_id": req.body.idData
                    }
                }
            }
        )

        data = await DocumentModel.findById({_id: req.params.id})

        res.status(200).json({
            msg:'Se eliminaron datos',
            data,
        })

    } catch( error ) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador de la base de datos'
        })
    }
}

const updateOneData = async(req = request, res = response) => {
    console.log('id actualizar', req.params.id)
    console.log('data', req.body)

    try{
        let data = await DocumentModel.findOneAndUpdate({"_id": req.params.id, "data._id": req.body._id},
            {
                $set: {
                    "data.$": req.body
                }
            }
        )

        data = await DocumentModel.findById({_id: req.params.id})

        res.status(200).json({
            msg:'Información actualizada',
            data
        })

    } catch( error ) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador de la base de datos'
        })
    }
}

const updateAddData = async(req = request, res = response) => {
    console.log('id actualizar', req.params.id)
    console.log('data', req.body)

    try{
        const document = await DocumentModel.findOne({"_id": req.params.id})
        document.data.push(req.body)

        await document.save()

        res.status(200).json({
            msg:'Información actualizada',
            document
        })

    } catch( error ) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador de la base de datos'
        })
    }
}

const createDocument = async(req = request, res = response) => {

    // console.log(req.body)

    try {
        const data = req.body

        const document = new DocumentModel({ data })

        // console.log(document)
        await document.save()

        res.status(201).json({
            msg: 'se registro el nuevo equipo',
            document,
        })

    } catch( error ) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador de la base de datos'
        })
    }
}

const deleteDocument = async(req = request, res = response) => {

    try {
        const { id } = req.params
        const document = await DocumentModel.findByIdAndDelete( id )

        res.status(200).json({
            msg: "Información eliminada",
            document,
        })

    } catch( error ) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador de la base de datos'
        })
    }
}

module.exports = {
    getDocumentById,
    getDocuments,
    createDocument,
    deleteOneData,
    updateOneData,
    deleteDocument,
    updateAddData
}