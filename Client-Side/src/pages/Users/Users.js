import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';
import User from '../../components/user/users';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import NotLogin from '../NotLogin';

let userArray = [];

function Users(props) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getAllUsers = async () => {
    const response = await fetch('http://localhost:8000/users/getAllUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      userArray = data.User;
      setIsLoading(false);
    });
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return localStorage.getItem('userId') !== null ? (
    <Layout user={props.user}>
      {isLoading ? (
        <div style={style}>
          <ThreeDots type="ThreeDots" color="#55c57a" height={80} width={80} />
        </div>
      ) : (
        <div className="container">
          <h3 className="p-3 text-center"></h3>
          <table className="table table-striped table-bordered">
            <thead style={{ fontSize: '18px' }}>
              <tr>
                <th>
                  <i className="fas fa-user pr-1" />
                  Name
                </th>
                <th>
                  <i className="fas fa-envelope pr-1" />
                  Email
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userArray.map((user) => (
                <User
                  name={user.username}
                  email={user.email}
                  user={user}
                ></User>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  ) : (
    <NotLogin />
  );
}

export default Users;
