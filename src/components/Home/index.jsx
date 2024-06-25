import { useAuth } from '../../context/Auth.jsx';
import Map from '../Map/index.jsx';

export default function Home() {
  const { user } = useAuth();
  return <div><Map user={user}/></div>;
}
