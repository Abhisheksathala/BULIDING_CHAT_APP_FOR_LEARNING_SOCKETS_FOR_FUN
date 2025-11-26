export const userChatData = [
  {
    _id: '1',
    name: 'Alice',
    avater: [
      'https://imgs.search.brave.com/5sa_7ONUZiCVUdjeQO7WkvaSy3RWsIdrDfcJmZ44gWA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE3/NzE3NDQ5Ny9waG90/by9sZXR0ZXItcy1w/YWludGVkLWluLWdv/bGQtYW5kLXdoaXRl/LW9uLWEtYmxhY2st/YmFja2dyb3VuZC1h/bmQtcGhvdG9ncmFw/aGVkLW9uLXRoZS1m/YWNhZGUtb2YtYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZVRkd25uN1phNFJz/QXliSzBUcVV4bUpW/LUZUQ21ZMHBnNHVF/ZU9wV1hzVT0',
    ],
    groupChat: false,
    sameSender: false, // Assuming the last message was not from you
    isOnline: true,
    newMessageAlert: { count: 3 },
    members: [1, 2],
    // handleDeleteChatOpen is a function, not data, so it would be passed as a prop
    handleDeleteChatOpen: (e, id, isGroup) => {
      e.preventDefault();
      console.log(`Open delete menu for chat ID: ${id}`);
    },
  },
  {
    _id: '2',
    name: 'Alice',
    avater: [
      'https://imgs.search.brave.com/5sa_7ONUZiCVUdjeQO7WkvaSy3RWsIdrDfcJmZ44gWA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE3/NzE3NDQ5Ny9waG90/by9sZXR0ZXItcy1w/YWludGVkLWluLWdv/bGQtYW5kLXdoaXRl/LW9uLWEtYmxhY2st/YmFja2dyb3VuZC1h/bmQtcGhvdG9ncmFw/aGVkLW9uLXRoZS1m/YWNhZGUtb2YtYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZVRkd25uN1phNFJz/QXliSzBUcVV4bUpW/LUZUQ21ZMHBnNHVF/ZU9wV1hzVT0',
      'https://imgs.search.brave.com/5sa_7ONUZiCVUdjeQO7WkvaSy3RWsIdrDfcJmZ44gWA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE3/NzE3NDQ5Ny9waG90/by9sZXR0ZXItcy1w/YWludGVkLWluLWdv/bGQtYW5kLXdoaXRl/LW9uLWEtYmxhY2st/YmFja2dyb3VuZC1h/bmQtcGhvdG9ncmFw/aGVkLW9uLXRoZS1m/YWNhZGUtb2YtYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZVRkd25uN1phNFJz/QXliSzBUcVV4bUpW/LUZUQ21ZMHBnNHVF/ZU9wV1hzVT0',
      'https://imgs.search.brave.com/5sa_7ONUZiCVUdjeQO7WkvaSy3RWsIdrDfcJmZ44gWA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE3/NzE3NDQ5Ny9waG90/by9sZXR0ZXItcy1w/YWludGVkLWluLWdv/bGQtYW5kLXdoaXRl/LW9uLWEtYmxhY2st/YmFja2dyb3VuZC1h/bmQtcGhvdG9ncmFw/aGVkLW9uLXRoZS1m/YWNhZGUtb2YtYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZVRkd25uN1phNFJz/QXliSzBUcVV4bUpW/LUZUQ21ZMHBnNHVF/ZU9wV1hzVT0',
    ],
    groupChat: true,
    sameSender: false, // Assuming the last message was not from you
    isOnline: true,
    members: [1, 2],
    newMessageAlert: { count: 3 },
    // handleDeleteChatOpen is a function, not data, so it would be passed as a prop
    handleDeleteChatOpen: (e, id, isGroup) => {
      e.preventDefault();
      console.log(`Open delete menu for chat ID: ${id}`);
    },
  },
];
