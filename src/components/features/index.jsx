import iconChat from '../../assets/icon-chat.png';
import iconMoney from '../../assets/icon-money.png';
import iconSecurity from '../../assets/icon-security.png';
import { FeatureItem } from '../featureItem';
import './features.css';

export function Features() {
   const features = [
      {
         icon: iconChat,
         title: 'You are our #1 priority',
         text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
      },
      {
         icon: iconMoney,
         title: 'More savings means higher rates',
         text: 'The more you save with us, the higher your interest rate will be!',
      },
      {
         icon: iconSecurity,
         title: 'Security you can trus',
         text: ' We use top of the line encryption to make sure your data and money is always safe.',
      },
   ];
   return (
      <div className="features">
         {features.map(({ icon, title, text }) => (
            <div key={title}>
               <FeatureItem icon={icon} title={title} text={text} />
            </div>
         ))}
      </div>
   );
}
