import mysql from 'mysql2/promise';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'flights',
};

const root = {
  flights: async () => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM flights');
    await connection.end();
    return rows;
  },
  flight: async ({ id }) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM flights WHERE id = ?', [id]);
    await connection.end();
    return rows[0] || null;
  },
  addFlight: async (args) => {
    const connection = await mysql.createConnection(dbConfig);

    function toMySQLDatetime(str) {
      if (str.includes('T')) {
        return str.replace('T', ' ').substring(0, 19);
      }
      return str.substring(0, 19);
    }

    const departure_time = toMySQLDatetime(args.departure_time);
    const arrival_time = toMySQLDatetime(args.arrival_time);

    const [result] = await connection.execute(
      `INSERT INTO flights (flight_code, airline_name, departure_time, arrival_time, price, \`from\`, \`to\`)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        args.flight_code,
        args.airline_name,
        departure_time,
        arrival_time,
        args.price,
        args.from,
        args.to,
      ]
    );
    const [rows] = await connection.execute('SELECT * FROM flights WHERE id = ?', [result.insertId]);
    await connection.end();
    return rows[0];
  },
};

export default root;