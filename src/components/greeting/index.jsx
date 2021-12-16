import './greeting.css';

export function Greeting() {
   return (
      <div className="header">
         <h1 className="header-text">
            Welcome back
            <br />
            Tony Jarvis!
         </h1>
         <button className="edit-button">Edit Name</button>
      </div>
   );
}
