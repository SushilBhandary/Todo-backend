const User = require("../models/user.scheme")
const Todo = require("../models/todo.schema")
const JWT = require("jsonwebtoken")
const config = require("../config/config")
const bcrypt = require("bcryptjs")


exports.signUp = async(req, res) => {
    const {name, email, password} = req.body

    if(!(name && email && password)) {
        res.status(401).send("Please fill all fields")
    }

    const existingUser = await User.findOne({email})
    if (existingUser) {
        res.status(401).send("User already exists")
    }

    const ency = await bcrypt.hash(password, 10)

    const user = await User.create({
            name, 
            email, 
            password : ency
        });
        const token = JWT.sign(
            {
                _id: user._id
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
    )
    user.password = undefined

    res.cookie("token", token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    } )

    res.status(200).json({
        success: true,
        token,
        user
    })
}


exports.login = async (req, res) => {
    const { email, password } = req.body
    if ( !email || !password) {
        res.status(400).send("Please fill all fields")
    }
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = JWT.sign({
                _id: user._id
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            })
        user.password = undefined; 
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true, 
        } )
        return res.status(200).json({
            success: true,
            token,
            user
        })
    } else {
        res.status(400).send("User does not exist")
    }
}


exports.logout = async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
}
