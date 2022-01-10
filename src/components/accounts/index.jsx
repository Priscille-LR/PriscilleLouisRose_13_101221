//import './account.css';
import { Account } from '../account';

export function Accounts() {
   const accounts = [
      {
         title: 'Argent Bank Checking (x8349)',
         amount: '$2,082.79',
         description: 'Available Balance',
      },
      {
         title: 'AArgent Bank Savings (x6712)',
         amount: '$10,928.42',
         description: 'Available Balance',
      },
      {
         title: 'Argent Bank Credit Card (x8349)',
         amount: '$184.30',
         description: 'Current Balance',
      },
   ];

   return (
      <div>
         {accounts.map(({ title, amount, description }) => (
            <div key={title}>
               <Account
                  title={title}
                  amount={amount}
                  description={description}
               />
            </div>
         ))}
      </div>
   );
}