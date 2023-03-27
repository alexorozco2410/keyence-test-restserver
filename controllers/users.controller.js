const { response, request } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user.model')
const { generateJWT } = require('../helpers/generate-jwt')

const getUsers = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query

    const [total, users] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
            .skip( Number(from) )
            .limit( Number(limit) )
    ])

    res.json({
        users,
        total
        
    })
}

const putUsers = async(req, res = response) => {

    const id = req.params.id
    const { password, ...rest } = req.body

    //validar con base de datos
    if ( password ) {
        const salt = bcrypt.genSaltSync()
        rest.password = bcrypt.hashSync( password, salt )
    }

    const user = await User.findByIdAndUpdate( id, rest )

    res.json({
        msg: "Put API - Controller",
        id
    })
}

const postUsers = async(req, res = response) => {

    try {
        const { name, password, email } = req.body
        const user = new User({ name, password, email })

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )

        //guardar en BD
        await user.save()

        const token = await generateJWT( user.id )

        res.json({
            msg: "Post API - Controller",
            user, 
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador de la base de datos'
        })
    }
}

const delUsers = async(req, res = response) => {

    const { id } = req.params
    // const uid = req.uid

    // borrar fisicamente 
    // const user = await User.findByIdAndDelete( id )

    const user = await User.findByIdAndUpdate( id, { status: false } )
    const authUser = req.authUser

    res.json({
        msg: "Delete API - Controller",
        user,
        // uid
        authUser
    })
}


module.exports = {
    getUsers,
    putUsers,
    postUsers,
    delUsers,
}