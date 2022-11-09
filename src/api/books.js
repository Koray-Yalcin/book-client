import axios from "axios"

const baseUrl = 'http://localhost:5000/books';

export const getBooks = async () => {
    return await axios.get(baseUrl);
};

export const deleteBooks = async (bookId) => {
    return await axios.delete(baseUrl + '/delete/' + bookId);
}

export const editBooks = async (bookId, name, author, price, image, status) => {
    return await axios.put(baseUrl + '/update/' + bookId, {
        name: name,
        author: author,
        price: price,
        image: image,
        status: status
    });
}

export const addBooks = async (name, author, price, status, image, userId) => {
    return await axios.post(baseUrl , {
        name: name,
        author: author,
        price: price,
        image: image,
        status: status,
        user_id: userId
    });
}