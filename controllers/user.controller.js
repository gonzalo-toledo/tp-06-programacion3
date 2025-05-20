const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db/users.json');

const readUsers = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

const getAllUsers = (req, res) => {
    let users = readUsers();
    
    res.json({data: users, status: 200, message: "usuarios obtenidos exitosamente"})
}

const getUserById = (req, res) => {
    let users = readUsers();
    const user = users.find(item=> item.id === parseInt(req.params.id));
    if (!user) return res.json ({status: 404, message:"usuario no encontrado"});
    
    res.json({data: user, status: 200, message: "usuarios obtenidos exitosamente"})
}

const createUser = (req, res) => {
    let users = readUsers();
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    writeUsers(users);

    res.json({data:newUser, status: 201, message: "usuario creado exitosamente"})
}

const updateUser = (req, res) =>{
    let users = readUsers();
    const user = users.find(item => item.id === parseInt(req.params.id));
    if (!user) return res.json ({status: 404, message:"usuario no encontrado"});
    const {nombre, apellido, edad, email} = req.body;
    user.nombre = nombre || user.nombre;
    user.apellido = apellido || user.apellido;
    user.edad = edad || user.edad;
    user.email = email || user.email;
    writeUsers(users);

    res.json({data: user, status: 200, message: "usuario actualizado exitosamente"})
}

const deleteUser = (req, res) => {
    let users = readUsers();
    const user = users.find(item => item.id === parseInt(req.params.id));
    if (!user) return res.json ({status: 404, message:"usuario no encontrado"});
    users = users.filter(item => item.id !== parseInt(req.params.id));
    writeUsers(users);

    res.json({data: user, status: 200, message: "usuario eliminado exitosamente"})
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}