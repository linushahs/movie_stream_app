import { isWatchOpenState } from "@/stores/store";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import VideoPlayer from "./VideoPlayer";

function SliderItemModal({ videoId }: { videoId: string }) {
  const [isOpen, setIsOpen] = useRecoilState(isWatchOpenState);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[500px] max-w-md transform overflow-hidden rounded-lg p-6 text-left align-middle shadow-xl transition-all">
                <button onClick={() => setIsOpen(false)}>Close</button>
                <VideoPlayer videoId={videoId} cn="w-[500px]" />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SliderItemModal;
