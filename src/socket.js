import io from 'socket.io-client';

const socket = io.connect('https://parking-api-h07g.onrender.com:3000');

export default socket;
