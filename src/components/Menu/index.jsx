import {
  LuSquare, LuPlay, LuLogOut, LuAlertTriangle,
} from 'react-icons/lu';
import { useAuth } from '../../context/Auth.jsx';
import { useLocation } from '../../context/Location.jsx';

export default function Menu() {
  const { user, logout } = useAuth();
  const { sharingLocation, setSharingLocation } = useLocation();

  const isTestUser = user.test;

  return (
    <div className="fixed bottom-10 rounded-3xl shadow-md overflow-hidden z-[2000] -translate-x-1/2 bg-white  left-1/2 dark:bg-gray-50 h-[10vh]">
      <div className="flex justify-center items-center mx-auto h-full">
        {user.type !== 2 ? (
          <>
            {' '}
            <button
              data-tooltip-target="tooltip-home"
              type="button"
              disabled={user.test}
              className="inline-flex flex-col h-full w-[100px] items-center justify-center p-4  group
          hover:bg-gray-200
          text-slate-400
          text-xs
          uppercase"
              onClick={() => alert('Notifying nearby signals')}
            >
              <LuAlertTriangle size={25} color={'grey'} />
              <span className="mt-1">Alert</span>
              {isTestUser && <sub className="text-xs[2px]">(disabled)</sub>}
            </button>
            <button
              data-tooltip-target="tooltip-home"
              type="button"
              disabled={isTestUser}
              className="
          inline-flex flex-col h-full w-[100px] items-center
          justify-center p-
           group
          hover:bg-gray-200
           text-slate-400
          text-xs
          uppercase"
              onClick={() => setSharingLocation(!sharingLocation)}
            >
              {sharingLocation ? (
                <>
                  <LuSquare size={25} color={'grey'} fill={'grey'} />
                  <span className="mt-2">Stop</span>
                  {isTestUser && <sub className="text-xs[2px]">(disabled)</sub>}
                </>
              ) : (
                <>
                  <LuPlay size={25} color={'grey'} fill={'grey'} />
                  <span className="mt-1">Start</span>
                  {isTestUser && <sub className="text-xs[2px]">(disabled)</sub>}
                </>
              )}
            </button>
          </>
        ) : (
          ''
        )}
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col h-full w-[100px] items-center justify-center p-4  group
          hover:bg-gray-200
          text-slate-400
          text-xs
          uppercase"
          onClick={() => logout()}
        >
          <LuLogOut size={25} color={'grey'} fill={'grey'} />
          <span className="mt-1">Logout</span>
        </button>
      </div>
    </div>
  );
}
