
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
