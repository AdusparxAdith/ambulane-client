import { useAuth } from '../../context/Auth.jsx';
import Map from '../Map/index.jsx';
import Menu from '../Menu/index.jsx';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className='flex flex-col'>
      <Map user={user} />
      <Menu />
    </div>
  );
}
