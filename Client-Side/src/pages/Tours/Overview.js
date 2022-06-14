import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { ThreeDots } from 'react-loader-spinner';

let tourArray;

function Overview(props) {
  const [isLoading, setIsLoading] = useState(true);

  const getAllTours = async () => {
    const response = await fetch('http://localhost:8000/getAllTours', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getAllTours().then((data) => {
      tourArray = data.Tours;
      setIsLoading(false);
    });
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
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
          tourArray.map((tour) => {
            return (
              <Card
                key={tour._id}
                name={tour.name}
                ratingsAverage={tour.ratingsAverage}
                ratingsQuantity={tour.ratingsQuantity}
                price={tour.price}
                summary={tour.summary}
                stops={tour.locations.length}
                coverImage={tour.coverImage}
                startingLocation={tour.startingLocation}
                difficulty={tour.difficulty}
                duration={tour.duration}
                slug={tour.slug}
              ></Card>
            );
          })
        )}
      </div>
    </Layout>
  );
}

export default Overview;
