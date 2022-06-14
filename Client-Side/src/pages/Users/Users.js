import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';
import User from '../../components/user/users';
import { ThreeDots } from 'react-loader-spinner';

let userArray = [];

function Users(props) {
  const [isLoading, setIsLoading] = useState(true);

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
      console.log(data.User);
      userArray = data.User;
      setIsLoading(false);
    });
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Layout user={props.user}>
      <div className="card-container">
        {isLoading ? (
          <div style={style}>
            <ThreeDots
              type="ThreeDots"
              color="#55c57a"
              height={80}
              width={80}
            />
          </div>
        ) : (
          userArray.map((user) => {
            return (
              <div>
                <div className="container mt-3 mb-4">
                  <div className="col-lg-9 mt-4 mt-lg-0">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                          <table className="table manage-candidates-top mb-0">
                            <thead>
                              <tr>
                                <th>User Name</th>
                                <th className="text-center">Email</th>
                                <th className="action text-right">Password</th>
                              </tr>
                            </thead>
                            <tbody>
                              <User
                                name={user.username}
                                email={user.email}
                              ></User>
                              <br />
                              <th></th>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}

export default Users;
