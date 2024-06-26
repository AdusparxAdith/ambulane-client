import { useAuth } from '../../context/Auth.jsx';
import { useLocation } from '../../context/Location.jsx';
import Map from '../Map/index.jsx';
import Menu from '../Menu/index.jsx';

export default function Home() {
  const { user } = useAuth();
  const { location } = useLocation();
  return (
    <div className="flex flex-col">
      <Map location={location} user={user} />
      <Menu />
    </div>
  );
}
