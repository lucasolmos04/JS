const User = require('../models/user');
const Car = require('../models/cars');
const schema = require('./schema/user.schema');

module.exports = {
    index: async (req, res, next) => { // Se debe colocar la palabra clave async para poder usar await
            const users = await User.find({});
            res.status(200).json(users);
    },

    newUser: async (req, res, next) => {
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                'error': true,
                'msg': 'Ha ocurrido un error'
            });
        }
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user);
    },

    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async (req, res, next) => {
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                'error': true,
                'msg': 'Ha ocurrido un error'
            });
        }
        const {userId} = req.params;
        const newUser = req.body;
        const oldUser = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    updateUser: async (req, res, next) => {
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                'error': true,
                'msg': 'Ha ocurrido un error'
            });
        }
        const {userId} = req.params;
        const newUser = req.body;
        const oldUser = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    deleteUser: async (req, res, next) => {
        const {userId} = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({success: true});
    },

    getUserCars: async (req, res, next) => {
        const {userId} = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user);
    },

    newUsersCar: async (req, res, next) => {
        const {userId} = req.params; // Obtenemos el id pasado por parametro
        const newCar = new Car(req.body); // Creamos un nuevo car obtenido del body
        const user = await User.findById(userId); // Obtenemos el usuario con el id pasado por parametro
        newCar.seller = user; // Al seller se le asigna el valor de user
        await newCar.save(); // guardamos el nuevo auto
        user.cars.push(newCar); // Al arreglo de autos que tiene el usuario se le agrega el auto recientemente creado
        await user.save();
        res.status(201).json(newCar);
    }
};