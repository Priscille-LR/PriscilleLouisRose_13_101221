import { Greeting } from '../../components/greeting';
import { Accounts } from '../../components/accounts';
import './profile.css';

export function Profile() {
   return (
      <main className="main bg-dark">
         <Greeting />
         <div>
            <h2 className="sr-only">Accounts</h2>
            <Accounts />
         </div>
      </main>
   );
}
