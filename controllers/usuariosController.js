
exports.list = async (req, res) => {
    try {
        const todos = require('../models/' + req.params.table)
        const colUsuarios = await todos.find({})
        res.json(colUsuarios)
    } catch (error) {
        console.log(error)
        res.send(error)
        next()
    }

}

exports.marcadoresInicial = async (req, res) => {
    const todos = require('../models/marcadores')

    try {
        const colMarcadores = await todos.aggregate(
            [
                [
                    {
                        '$lookup': {
                            'from': "equipos",
                            'localField': "equi_id",
                            'foreignField': "_id",
                            'as': "equipo1",
                        },
                    },
                    {
                        '$unwind': {
                            'path': "$equipo1",
                        },
                    },
                    {
                        '$lookup': {
                            'from': "equipos",
                            'localField': "equi_id2",
                            'foreignField': "_id",
                            'as': "equipo2",
                        },
                    },
                    {
                        '$unwind': {
                            'path': "$equipo2",
                        },
                    },
                    {
                        '$lookup': {
                            'from': "deportes",
                            'localField': "dep_id",
                            'foreignField': "_id",
                            'as': "deporte",
                        },
                    },
                    {
                        '$unwind': {
                            'path': "$deporte",
                        },
                    },
                    {
                        '$lookup': {
                            'from': "usuarios",
                            'localField': "usu_id",
                            'foreignField': "_id",
                            'as': "usuario",
                        },
                    },
                    {
                        '$unwind': {
                            'path': "$usuario",
                        },
                    },
                    {
                        '$project': {
                            'dep_id': "$dep_id",
                            'deporte': "$deporte.dep_nombre",
                            'usu_id': "$usu_id",
                            'usuario': "$usuario.usu_nombres",
                            'mar_fechaEvento': "$mar_fechaEvento",
                            'mar_horaEvento': "$mar_horaEvento",
                            'mar_fechaRegistro': "$mar_fechaRegistro",
                            'mar_horaRegistro': "$mar_horaRegistro",
                            'equi_id': "$equi_id",
                            'equipo1': "$equipo1.equi_nombre",
                            'equi_id2': "$equi_id2",
                            'equipo2': "$equipo2.equi_nombre",
                            'mar_marcadoresqui1': "$mar_marcadoresqui1",
                            'mar_marcadoresqui2': "$mar_marcadoresqui2",
                        },
                    },
                    {
                        '$sort': {
                            'mar_fechaRegistro': -1,
                        },
                    },
                    {
                        '$limit': req.params.lim * 1,
                    },
                ]
            ]

        )
        res.json(colMarcadores)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

}




exports.add = async (req, res) => {
   
    try {
const todos = require('../models/' + req.params.table)
    const todo = new todos(req.body)
        await todo.save()
        res.json(todo)
    } catch (error) {
        console.log(error)
        res.send(error)
        next()
    }

}

exports.showUsuario = async (req, res, next) => {
    try {
        const todos = require('../models/' + req.params.table)
        const usuario1 = req.params.usuario
        const clave = req.params.clave
        const usuario = await todos.findOne({ usu_email: usuario1, usu_clave: clave })
        if (!usuario) {
            res.status(404).json({
                message: 'el ' + req.params.table + ' no existe'
            })
        } else res.json(usuario)
    } catch (error) {
        res.status(404).json({
            message: 'error al procesar la peticion'
        })

    }
}


exports.update = async (req, res, next) => {
    try {
        const todos = require('../models/' + req.params.table)
        const todo = await todos.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        if (!todo) {


        } else {
            res.json(
                {
                    message: req.params.table + ' actualizados'
                }
            )
        }

    } catch (error) {
        res.status(400).json({
            message: 'error al procesar la peticion'
        })
    }
}

exports.delete = async (req, res) => {
    
    try {
    const todos = require('../models/' + req.params.table)
    const id = req.params.id
        await todos.findByIdAndDelete({ _id: id });
        res.json(
            {
                message: req.params.table + ' eliminado'
            }
        )
    } catch (error) {
        res.status(400).json({
            message: 'error al procesar la peticion'
        })
    }

}
