import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutInitiate } from '../store/actions/userActions';
import 'antd/dist/antd.css';
import { Layout, message, Menu, Card, Button, Modal, Input, Select } from 'antd';
import './Home.css';
import { EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { getBooks, deleteBooks, editBooks, addBooks } from '../api/books'

const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { Option } = Select;


function Home() {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookState, setBookState] = useState([]);
  const [editBookState, setEditBookState] = useState([]);
  const [visibleState, setVisibleState] = useState(false);
  const [visibleStateForAdd, setVisibleStateForAdd] = useState(false);
  const [addBookState, setAddBookState] = useState([]);
  const [keyState, setKeyState] = useState(1);

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

    const editBook = async (bookId, name, author, price, image, status) => {
      try {
        await editBooks(bookId, name, author, price, image, status).then(() => {
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

    const onChangeAdd = (e) => {
      if(e.target.name === 'name') {
        setAddBookState({...addBookState, name: e.target.value})
      }
      else if(e.target.name === 'author') {
        setAddBookState({...addBookState, author: e.target.value})
      }
      else if (e.target.name === 'price') {
        setAddBookState({...addBookState, price: e.target.value})
      }
      else if (e.target.name === 'image') {
        setAddBookState({...addBookState,image: e.target.value})
      }
    }

    const addBook = async (name, author, price, status, image, userId) => {
      try {
        console.log(userId)
        await addBooks(name, author, price, status, image, userId).then(() => {
          getBooks().then((res) => {
          setBookState(res.data);
          message.success('Added');
        });
        })
      } catch (error) {
        message.error('Failed');
        console.log(error);
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
      onClick={({key}) => {
         if(key === 'logout') {
           if(currentUser) {
            setKeyState(key);
             dispatch(logoutInitiate());
           }
         } else if (key === '1') {
          setKeyState(key);
          console.log(keyState);
         }
         else if (key === '2') {
          setKeyState(key);
          console.log(keyState);
         }
         else if (key === '3') {
          setKeyState(key);
          console.log(keyState);
         }
      }}
        theme="dark"
        style={{textAlign: 'center', justifyContent: 'center', display: 'flex'}}
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
          {
            label: currentUser?.displayName,
            key: 'Profile',
            icon: <BookOutlined />,
            children: [
              {
                label: 'Logout',
                key: 'logout'
              }
            ]

          }
        ]}
      />
    </Header>
    <Content
      className="site-layout"
      style={{
        padding: '0 50px',
        marginTop: 64,
      }}
    >
      <Button style={{float: 'right', marginTop: '2%'}} type="primary" onClick={() => {setVisibleStateForAdd(true);}} >Add New Book</Button>
          <div style={{display: 'flex', marginLeft: '10%', flexWrap: 'wrap'}}>
            {bookState.map(book => 
            book.user_id === currentUser?.uid ?
            book.status === parseInt(keyState) ?
            
              <Card key={book._id}
              hoverable={false}
              style={{
                width: 240, marginTop: '8%', marginRight: '3%'
              }}
              cover={<img style={{height: '330px'}} alt="example" src={book.image} />}
              >
                <Meta style={{display: 'block', textAlign: 'center'}} title={book.name} description={book.author} />
                <Meta style={{display: 'block', textAlign: 'center'}} title={book.price + ' TL'}  />
                <Button style={{right: '40%'}}
                  onClick={() => {setVisibleState(true); setEditBookState(book);}}
                  type="primary"
                  icon={<EditOutlined />}
                  
                  />

                  <Modal
                  title= {'Edit Book'}
                  open={visibleState}
                  onOk={() => {editBook(editBookState._id, editBookState.name, editBookState.author, editBookState.price, editBookState.image, editBookState.status); setVisibleState(false);}}
                  onCancel={() => {setVisibleState(false); setEditBookState([]);}}
                >
                  <p>Book Name <Input placeholder="Enter Book Name" name='name' value={editBookState.name} onChange={(e) => {onChange(e);}} /></p>
                  <p>Author Name <Input placeholder="Enter Author Name" name='author' value={editBookState.author} onChange={(e) => {onChange(e);}} /></p>
                  <p> Price <Input placeholder="Enter Price" name='price' value={editBookState.price} onChange={(e) => {onChange(e);}} /></p>
                  <p> Status </p>
                    <Select onChange={(e) => {setEditBookState({...editBookState, status: e})}} value= {editBookState.status} >
                        <Option disabled={true} value="0">Select Book Status</Option>
                        <Option value="1">Reading</Option> 
                        <Option value="2">Read Later</Option>
                        <Option value="3">Readed</Option>  
                    </Select>
                  <p> Image URL <Input placeholder="Enter Image URL" name='image' value={editBookState.image} onChange={(e) => {onChange(e);}} /></p>
                </Modal>
                
                <Modal
                  title= {'Add Book'}
                  open={visibleStateForAdd}
                  onOk={() => {addBook(addBookState.name, addBookState.author, addBookState.price, addBookState.status, addBookState.image, currentUser.uid); setVisibleStateForAdd(false);}}
                  onCancel={() => {setVisibleStateForAdd(false);}}
                >
                  <p>Book Name <Input placeholder="Enter Book Name" name='name' value={addBookState.name} onChange={(e) => {onChangeAdd(e);}} /></p>
                  <p>Author Name <Input placeholder="Enter Author Name" name='author' value={addBookState.author} onChange={(e) => {onChangeAdd(e);}} /></p>
                  <p> Price <Input placeholder="Enter Price" name='price' value={addBookState.price} onChange={(e) => {onChangeAdd(e);}} /></p>
                  <p> Status </p>
                    <Select onChange={(e) => {setAddBookState({...addBookState, status: e})}} defaultValue="0">
                      <Option disabled={true} value="0">Select Book Status</Option>
                      <Option value="1">Reading</Option>
                      <Option value="2">Read Later</Option>
                      <Option value="3">Readed</Option>
                    </Select>
           
                  <p> Image URL <Input placeholder="Enter Image URL" name='image' value={addBookState.image} onChange={(e) => {onChangeAdd(e);}} /></p>
                </Modal>

                  <Button style={{left: '40%'}}
                  onClick={(e) => {deleteBook(book._id)}}
                  danger
                  type="primary"
                  icon={<DeleteOutlined />}/>
              
              </Card> : null : null)
              }
  
          </div>
          </Content>
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