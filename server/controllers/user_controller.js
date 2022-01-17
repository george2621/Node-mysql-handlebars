import mysql from 'mysql';

//Connection Pool
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hackmyfuture',
    database: 'user_managment_system'
});

connection.connect((err) => {
    if (err) throw err
    console.log("MySql Connected .. ");
});



export const viewUsers = (req, res) => {
    const query = 'SELECT * FROM users'
    connection.query(query, (err, result) => {
        if (err) throw err;
        let removedUser = req.query.removed;
        res.render('home', { result, removedUser })
    })
}

export const findUser = (req, res) => {
    const searchTerm = req.body.search;
    const query = `
    SELECT * FROM users 
    WHERE first_name LIKE '%${searchTerm}%' 
    OR last_name LIKE '%${searchTerm}%'`

    connection.query(query, (err, result) => {
        if (err) throw err;
        res.render('home', { result })
    })
}


export const addUserPage = (req, res) => {
    res.render('add-user');
}

export const addUser = (req, res) => {
    const { first_name, last_name, phone, email, comment } = req.body;
    const post = { first_name: first_name, last_name: last_name, email: email, phone: phone, comments: comment };
    const query = `
    INSERT INTO users SET ?  
    `
    connection.query(query, post, (err, result) => {
        if (err) throw err;
        res.render('add-user', { alert: 'User added successfully.' });
    })
}


export const editUserPage = (req, res) => {
    const query = `SELECT * FROM users WHERE id=${req.params.id}`
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.render('edit-user', { result })
    })
}

export const editUser = (req, res) => {
    const { first_name, last_name, phone, email, comment } = req.body;
    const post = { first_name: first_name, last_name: last_name, email: email, phone: phone, comments: comment };
    const query = `
    UPDATE users
    SET ?
    WHERE id=${req.params.id}`
    connection.query(query, post, (err, result) => {
        if (err) throw err;
        // res.render('edit-user', { alert: `User whit the Id ${req.params.id} is updated.` })
        const query = `SELECT * FROM users WHERE id=${req.params.id}`
        connection.query(query, (err, result) => {
            if (err) throw err;
            res.render('edit-user', { result, alert: `The user with the id ${req.params.id} is updated` })
            console.log('data from database', result);
        })
    })
}

export const deleteUser = (req, res) => {
    const query = `DELETE FROM users WHERE id=${req.params.id}`
    connection.query(query, (err, result) => {
        if (err) throw err;
        let removedUser = encodeURIComponent('User successfully removed.')
        res.redirect('/?removed=' + removedUser);
    })
}

export const viewUserPage = (req, res) => {
    const query = `SELECT * FROM users WHERE id=${req.params.id}`
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.render('view-user', { result })
    })
}