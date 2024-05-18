import { useState, useRef, useEffect, RefObject, ReactNode } from "react";

interface InPageNavigationProps {
  routes: string[];
  defaultHidden?: string[];
  defaultActiveIndex?: number;
  children: ReactNode | ReactNode[];
}

export let activeTabLineRef: RefObject<HTMLHRElement>;
export let activeTabRef: RefObject<HTMLButtonElement>;

const InPageNavigation = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children,
}: InPageNavigationProps) => {

  activeTabLineRef = useRef<HTMLHRElement>(null);
  activeTabRef = useRef<HTMLButtonElement>(null);

  // Initialize state
  const [inPageNavIndex, setInPageNavIndex] = useState<number | null>(null);
  const [isResizeEventAdded, setIsResizeEventAdded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const changePageState = (btn: HTMLButtonElement, i: number) => {
    const { offsetWidth, offsetLeft } = btn;

    if (activeTabLineRef.current) {
      activeTabLineRef.current.style.width = offsetWidth + "px";
      activeTabLineRef.current.style.left = offsetLeft + "px";
    }

    setInPageNavIndex(i);
  };

  useEffect(() => {
    if (width > 766 && inPageNavIndex !== defaultActiveIndex) {
      if (activeTabRef.current) {
        changePageState(activeTabRef.current, defaultActiveIndex);
      }
    }

    if (!isResizeEventAdded) {
      window.addEventListener("resize", () => {
        if (!isResizeEventAdded) {
          setIsResizeEventAdded(true);
        }

        setWidth(window.innerWidth);
      });
    }
  }, [width, inPageNavIndex, defaultActiveIndex, isResizeEventAdded]);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => (
          <button
            ref={i === defaultActiveIndex ? activeTabRef : null}
            key={i}
            className={`p-4 px-5 capitalize ${
              inPageNavIndex === i ? "text-black " : "text-dark-grey "
            }${defaultHidden.includes(route) ? " md:hidden " : " "}`}
            onClick={(e) => changePageState(e.target as HTMLButtonElement, i)}
          >
            {route}
          </button>
        ))}

        <hr
          ref={activeTabLineRef}
          className="absolute bottom-0 duration-300 border-dark-grey"
        />
      </div>

      {Array.isArray(children) ? children[inPageNavIndex!] : children}
    </>
  );
};

export default InPageNavigation;
