import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutInitiate } from '../store/actions/userActions';
import 'antd/dist/antd.css';
import { Layout, message, Menu, Card, Button, Modal, Input } from 'antd';
import './Home.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getBooks, deleteBooks, editBooks } from '../api/books'

const { Header, Footer } = Layout;
const { Meta } = Card;


function Home() {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookState, setBookState] = useState([]);
  const [editBookState, setEditBookState] = useState([]);
  const [visibleState, setVisibleState] = useState(false);

  const handleAuth = () => {
    if(currentUser) {
      dispatch(logoutInitiate());
    }
  }

  useEffect(() => {
    console.log('geldi')
    console.log(currentUser, !currentUser)
      if(!currentUser) {
        navigate('/login');
    }
    getBooks().then((res) => {
      setBookState(res.data);
    });

  }, [currentUser, navigate]);

      const deleteBook = async(bookId) => {
        try {
          await deleteBooks(bookId).then(() => {
            getBooks().then((res) => {
              setBookState(res.data);
              message.success('Deleted');
            })
          })
        } catch (error) {
          console.log(error);
        }
      };

    const editBook = async (bookId, name, author, price, image) => {
      try {
        await editBooks(bookId, name, author, price, image).then(() => {
          getBooks().then((res) => {
          setBookState(res.data);
          message.success('Edited');
        });
        })
      } catch (error) {
        console.log(error);
      }
      
    }

    const onChange = (e) => {
      if(e.target.name === 'name') {
        setEditBookState({...editBookState, name: e.target.value})
      }
      else if(e.target.name === 'author') {
        setEditBookState({...editBookState, author: e.target.value})
      }
      else if (e.target.name === 'price') {
        setEditBookState({...editBookState, price: e.target.value})
      }
      else if (e.target.name === 'image') {
        setEditBookState({...editBookState, image: e.target.value})
      }
    }

  return (
    <div style={{textAlign: 'center'}}>
      <Layout>
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}
    >
      <div className="logo" />
      <Menu
      onClick={({key}) => {console.log(key)}}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            label: 'Reading',
            className: 'Reading',
          },
          {
            key: '2',
            label: 'Read Later',
            className: 'ReadLater'
          },
          {
            key: '3',
            label: 'Readed',
          },
        ]}
      />
      <button className='btn btn-danger' onClick={handleAuth}>Logout</button>
    </Header>
          <div style={{display: 'flex', marginLeft: '10%', flexWrap: 'wrap'}}>
            {bookState.map(book => 
            book.user_id === currentUser?.uid ?
              <Card key={book._id}
              hoverable={false}
              style={{
                width: 240, marginTop: '10%', marginRight: '3%'
              }}
              cover={<img style={{height: '330px'}} alt="example" src={book.image} />}
              >
                <Meta style={{display: 'block', textAlign: 'center'}} title={book.name} description={book.author} />
                <Meta style={{display: 'block', textAlign: 'center'}} title={book.price + ' TL'}  />
                <Button style={{right: '40%'}}
                  onClick={() => {setVisibleState(true); setEditBookState(book); console.log('onclick ',editBookState)}}
                  type="primary"
                  icon={<EditOutlined />}
                  
                  />

                  <Modal
                  title= {'Edit Book'}
                  open={visibleState}
                  onOk={() => {editBook(editBookState._id, editBookState.name, editBookState.author, editBookState.price, editBookState.image); setVisibleState(false);}}
                  onCancel={() => {setVisibleState(false); setEditBookState([]); console.log('cancel ',editBookState)}}
                >
                  <p>Book Name <Input placeholder="Enter Book Name" name='name' value={editBookState.name} onChange={(e) => {onChange(e);}} /></p>
                  <p>Author Name <Input placeholder="Enter Author Name" name='author' value={editBookState.author} onChange={(e) => {onChange(e);}} /></p>
                  <p> Price <Input placeholder="Enter Price" name='price' value={editBookState.price} onChange={(e) => {onChange(e);}} /></p>
                  <p> Image URL <Input placeholder="Enter Image URL" name='image' value={editBookState.image} onChange={(e) => {onChange(e);}} /></p>
                </Modal>

                  <Button style={{left: '40%'}}
                  onClick={(e) => {deleteBook(book._id)}}
                  danger
                  type="primary"
                  icon={<DeleteOutlined />}/>
              
              </Card> : null)
              }
  
          </div>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
    </div>
  )
}

export default Home;