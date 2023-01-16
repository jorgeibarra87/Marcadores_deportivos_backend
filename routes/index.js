const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuariosController')

module.exports = () => {

    try {
        router.get('/:table', usuariosController.list)
        router.get('/:table/:lim',usuariosController.marcadoresInicial)
        router.get('/:table/:usuario/:clave', usuariosController.showUsuario)
        router.post('/:table', usuariosController.add)
        router.put('/:table/:id', usuariosController.update)
        router.delete('/:table/:id', usuariosController.delete)
     

    } catch (error) {
        
    }
    return router
}

