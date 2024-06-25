import { useAuth } from '../../context/Auth.jsx';

export default function Home() {
  const { user } = useAuth();

  return <div>{user.name}</div>;
}
