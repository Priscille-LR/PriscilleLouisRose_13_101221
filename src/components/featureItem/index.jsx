import './featureItem.css';

export function FeatureItem({ icon, title, text }) {
   return (
      <div className="feature-item">
         <img src={icon} alt=" Icon" className="feature-icon" />
         <h3 className="feature-item-title">{title}</h3>
         <p>{text}</p>
      </div>
   );
}
