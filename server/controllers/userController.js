const User = require('../models/User');
const Permission = require('../models/Permissions');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {populate} = require("dotenv");

/**
 * Asynchronously creates a new user account.
 *
 * @async
 * @function registerUser
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {void}
 */
exports.registerUser = async (req, res) => {
  const {username, email, password, role} = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username } ] });

    if (userExists) {
      return res.status(400).json({
        message: 'El usuario ya existe. Intenta con otro email y/o nombre de usuario'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({message: 'Usuario creado exitosamente', userId: user.id});
  } catch (error) {
    res.status(500).json({message: 'Error al crear el usuario', error: error.message});
  }
};

/**
 * Asynchronously authenticates a user.
 *
 * @async
 * @function loginUser
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {void}
 */
exp
exports.loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email})
        .populate("role");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({message: 'Credenciales incorrectas'});
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '3h'});

    res.status(200).json({message: 'Inicio de sesión exitoso', token, user});
  } catch (error) {
    res.status(500).json({message: 'Error al iniciar sesión', error: error.message});
  }
};

/**
 * Asynchronously retrieves all users.
 *
 * @async
 * @function getUsers
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {void}
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({})
        .populate("role");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener usuarios', error: error.message});
  }
};

/**
 * Asynchronously retrieves all available roles.
 *
 * @async
 * @function getAvailableRoles
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {void}
 */
exports.getAvailableRoles = async (req, res) => {
  try {
    const permissions = await Permission.find({});
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener usuarios', error: error.message});
  }
}

/**
 * Asynchronously retrieves profile information for current user.
 *
 * @async
 * @function getProfileInfo
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {void}
 */
exports.getProfileInfo = async (req, res) => {
  try {
    const users = await User.find({})
        .populate("role");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener usuarios', error: error.message});
  }
};