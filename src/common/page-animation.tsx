import { FC, ReactNode } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

interface AnimationWrapperProps extends MotionProps {
  children: ReactNode;
  keyValue?: string | number;
  className?: string;
}

const AnimationWrapper: FC<AnimationWrapperProps> = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
