const UsuariosCtr = {};
const connect = require('../../DBConexion');

UsuariosCtr.getUsuarios = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM usuarios;');
    res.json(rows);
};

UsuariosCtr.getUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario;
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [
        idUsuario
    ]);
    rows.length != 0 ?
        res.json({
            obj: rows[0],
            ok: true
        }) :
        res.json({
            msg: 'No existe registros',
            ok: false
        });
};

UsuariosCtr.createUsuario = async (req, res) => {
    const Nombre = req.body.Nombre;
    const Apellido = req.body.Apellido;
    const Correo = req.body.Correo;
    const Contrasena = req.body.Contrasena;
    const Curp = req.body.Curp;
    const Telefono = req.body.Telefono;

    const connection = await connect();
    const [results] = await connection.query('INSERT INTO Usuarios (Nombre, Apellido, Correo, Contrasena, Curp, Telefono) VALUES (?,?,?,?,?,?)',[
        Nombre,
        Apellido,
        Correo,
        Contrasena,
        Curp,
        Telefono
    ]);
    res.json({
        id: results.insertId,
        ...req.body
    });
};

UsuariosCtr.deleteUsuario  = async (req, res) => {
    const idUsuario = req.params.idUsuario;
    const connection = await connect();
    
    const result = await connection.query('DELETE FROM Usuarios WHERE idUsuario = ?', [idUsuario]);
    result[0].affectedRows != 0 ?
        res.json({
            msg: 'Usuario eliminado con exito',
            ok: true
        }) :
        res.json({
            msg: 'Error al eliminar....',
            ok: false
        });
};

UsuariosCtr.updateUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario;
    const connection = await connect();
    const result = await connection.query('UPDATE Usuarios SET ? WHERE idUsuario = ?', [
        req.body,
        idUsuario
    ]);
    result[0].affectedRows === 0 ?
        res.json({
            msg: "Error al modificar...",
            ok: false
        }) :
        res.json({
            msg: "Registro modificado con exito",
            ok: true
        });
};

module.exports = UsuariosCtr;