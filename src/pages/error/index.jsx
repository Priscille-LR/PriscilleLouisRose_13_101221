import { Link } from 'react-router-dom';
import './error.css';

export function Error() {
   return (
      <div className="error">
         <h1 className="error-title">Error 404</h1>
         <h2>Oops! We couldn't find the page you're looking for...</h2>
         <Link to="/" className="homepage-link">
            <p>...However you can always go back to the homepage</p>
         </Link>
      </div>
   );
}
