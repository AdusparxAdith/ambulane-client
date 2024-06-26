import { LuSquare, LuPlay, LuLogOut } from 'react-icons/lu';
import { useAuth } from '../../context/Auth.jsx';
import { useLocation } from '../../context/Location.jsx';

export default function Menu() {
  const { logout } = useAuth();
  const { sharingLocation, setSharingLocation } = useLocation();

  return (
    <div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white  left-1/2 dark:bg-gray-200 h-[10vh]">
      <div className="flex justify-center items-center mx-auto h-full">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="
          inline-flex flex-col h-full w-[100px] items-center
          justify-center p-4 hover:bg-gray-50
          dark:hover:bg-gray-200 group
          text-slate-400
          text-xs
          uppercase"
          onClick={() => setSharingLocation(!sharingLocation)}
        >
          {sharingLocation ? (
            <>
              <LuSquare size={25} color={'grey'} fill={'grey'} />
              <span className="mt-2">Stop</span>
            </>
          ) : (
            <>
              <LuPlay size={25} color={'grey'} fill={'grey'} />
              <span className="mt-1">Start</span>
            </>
          )}
        </button>
      </div>
      <div className="fixed right-0 h-full bottom-0 z-50">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col h-full w-[100px] items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-200 group
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
