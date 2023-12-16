import io from 'socket.io-client';

const socket = io.connect('https://parking-api-h07g.onrender.com');

export default socket;
